/**
 * Contact details, in one place.
 *
 * These were previously typed inline at three call sites and had already
 * drifted into three different numbers — one of them a placeholder that would
 * have sent enquiries to a stranger. Import from here rather than pasting a
 * number into a component.
 *
 * Format is what wa.me expects: country code, no `+`, no spaces.
 */

/** General enquiries — the floating widget and the contact form. */
export const WHATSAPP_GENERAL = "917999117324";

/** Workshop bookings — the booking page. */
export const WHATSAPP_BOOKINGS = "917815809412";

export const whatsappLink = (number, message) =>
  message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`;
