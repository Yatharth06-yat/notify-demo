/**
 * Small helpers over Node's req/res so the same handlers run unchanged under
 * `vite dev` (via the middleware in vite.config.js) and on Vercel.
 */

/** An error carrying an HTTP status the router will surface to the client. */
export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const badRequest = (message, details) => new HttpError(400, message, details);
export const unauthorized = (message = "Not signed in") => new HttpError(401, message);
export const forbidden = (message = "You don't have permission to do that") =>
  new HttpError(403, message);
export const notFound = (message = "Not found") => new HttpError(404, message);
export const conflict = (message) => new HttpError(409, message);
export const tooManyRequests = (message = "Too many requests. Try again shortly.") =>
  new HttpError(429, message);

export function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
}

export function sendNoContent(res) {
  res.statusCode = 204;
  res.end();
}

const MAX_JSON_BYTES = 1024 * 1024; // 1 MB — plenty for any form on the site.

/** Collect the raw request body, refusing anything over `limit` bytes. */
export function readRawBody(req, limit) {
  return new Promise((resolve, reject) => {
    // Vercel may have buffered the body already.
    if (Buffer.isBuffer(req.body)) return resolve(req.body);
    if (typeof req.body === "string") return resolve(Buffer.from(req.body));

    const chunks = [];
    let total = 0;
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > limit) {
        reject(new HttpError(413, "Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

/** Parse a JSON request body into a plain object. Missing body → {}. */
export async function readJsonBody(req) {
  // Vercel's Node runtime parses JSON bodies for us when it can.
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  const raw = await readRawBody(req, MAX_JSON_BYTES);
  if (raw.length === 0) return {};
  try {
    const parsed = JSON.parse(raw.toString("utf8"));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw badRequest("Request body must be a JSON object");
    }
    return parsed;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw badRequest("Request body is not valid JSON");
  }
}

/**
 * Best-effort client IP, for rate limiting.
 *
 * Behind Vercel the socket address is the proxy's, so the left-most entry of
 * X-Forwarded-For is the caller. That header is client-supplied and forgeable
 * in general — it is trustworthy here only because the platform overwrites it
 * at the edge. Never use it for authorisation, only for throttling.
 */
export function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "";
}

/** Parsed URL for the request, with the host filled in from the Host header. */
export function requestUrl(req) {
  return new URL(req.url, `http://${req.headers.host || "localhost"}`);
}
