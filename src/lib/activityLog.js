import { createDoc } from "./api";

/**
 * Append an entry to the audit trail. Never throws — a failed log must not
 * take down the action the admin actually asked for.
 *
 * The actor is not sent. The API reads it from the session token, so an entry
 * cannot be attributed to somebody else; the `actor` argument survives only so
 * call sites read as they did before, and is ignored.
 *
 * @param {unknown} _actor  ignored — the server knows who is signed in
 * @param {string} action  e.g. "Approved registration"
 * @param {string} target  e.g. "Ananya Sharma — IoT Masterclass"
 */
export async function logActivity(_actor, action, target = "") {
  try {
    await createDoc("activityLogs", { action, target });
  } catch (error) {
    console.warn("Activity log write failed", error);
  }
}
