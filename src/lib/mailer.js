import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATES = {
  Approved: import.meta.env.VITE_EMAILJS_TEMPLATE_APPROVED,
  Rejected: import.meta.env.VITE_EMAILJS_TEMPLATE_REJECTED,
};

/** EmailJS is optional — without keys the portal simply skips sending. */
export function isMailerConfigured(status) {
  return Boolean(SERVICE_ID && PUBLIC_KEY && TEMPLATES[status]);
}

/**
 * Notify a student that their registration was approved or rejected.
 * Resolves to { sent: boolean, reason?: string } and never throws, so a mail
 * outage can't block the status change that already succeeded.
 */
export async function sendStatusEmail(registration, status, labInfo = {}) {
  if (!isMailerConfigured(status)) {
    return { sent: false, reason: "not-configured" };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATES[status],
      {
        to_name: registration.name,
        to_email: registration.email,
        workshop_name: registration.workshopTitle || "",
        status,
        lab_name: labInfo.name || "IoTify Lab",
        lab_email: labInfo.email || "",
        lab_phone: labInfo.phone || "",
      },
      PUBLIC_KEY
    );
    return { sent: true };
  } catch (error) {
    console.error("EmailJS send failed", error);
    return { sent: false, reason: "send-failed" };
  }
}
