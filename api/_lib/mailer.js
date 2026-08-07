/**
 * Server-side email.
 *
 * `src/lib/mailer.js` sends approval notices through EmailJS from the browser.
 * That is fine for a message the recipient is allowed to read, but it cannot
 * carry a one-time code: anything the browser can send, the browser can also
 * read, so the "secret" would be handed to whoever asked for it. Codes are
 * generated and delivered here instead, where the client never sees them.
 *
 * Two transports, picked from the environment:
 *
 *   RESEND_API_KEY set  →  deliver over Resend's HTTP API (no dependency; Node
 *                          18+ has fetch built in)
 *   otherwise           →  write the message to the server log
 *
 * The log transport is what makes local development work without credentials —
 * the code appears in the `npm run dev` terminal. It refuses to run when
 * NODE_ENV is "production" so a missing key in a deploy fails loudly instead of
 * printing login codes into a hosting provider's log stream.
 */

import { HttpError } from "./http.js";

const FROM = process.env.MAIL_FROM || "IoTify Lab <onboarding@resend.dev>";

function transportName() {
  if (process.env.RESEND_API_KEY) return "resend";
  return "console";
}

async function sendViaResend({ to, subject, text }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, text }),
  });

  if (!response.ok) {
    // Surface the provider's reason — "domain not verified" is by far the most
    // common first-run failure and is unguessable from a generic message.
    const detail = await response.text().catch(() => "");
    throw new HttpError(
      502,
      "Could not send the email. Please try again in a moment.",
      detail.slice(0, 500)
    );
  }
}

function sendViaConsole({ to, subject, text }) {
  if (process.env.NODE_ENV === "production") {
    throw new HttpError(
      503,
      "Email is not configured on this server, so codes cannot be sent. Set RESEND_API_KEY."
    );
  }
  // eslint-disable-next-line no-console
  console.log(
    [
      "",
      "┌─ email (dev transport — not actually sent) ──────────────",
      `│ to:      ${to}`,
      `│ subject: ${subject}`,
      "├──────────────────────────────────────────────────────────",
      ...text.split("\n").map((line) => `│ ${line}`),
      "└──────────────────────────────────────────────────────────",
      "",
    ].join("\n")
  );
}

/**
 * Deliver a plain-text email. Throws HttpError on failure — callers decide
 * whether that should fail the request or be swallowed.
 */
export async function sendMail({ to, subject, text }) {
  if (transportName() === "resend") {
    await sendViaResend({ to, subject, text });
    return { transport: "resend" };
  }
  sendViaConsole({ to, subject, text });
  return { transport: "console" };
}

/** True when real delivery is configured; used to warn on the setup screen. */
export const mailIsConfigured = () => transportName() !== "console";

export function otpEmail({ code, purpose, minutes }) {
  const action =
    purpose === "signup" ? "confirm your email address" : "reset your password";

  return {
    subject: `${code} is your IoTify Lab code`,
    text: [
      `Your code is ${code}`,
      "",
      `Enter it to ${action}. It expires in ${minutes} minutes and works once.`,
      "",
      "If you didn't ask for this code, you can ignore this email — nothing",
      "has changed on your account.",
      "",
      "— IoTify Lab, Centre for IoT, MITS Gwalior",
    ].join("\n"),
  };
}
