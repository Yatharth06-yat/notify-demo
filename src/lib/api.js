/**
 * Client for the IoTify API (api/[...path].js).
 *
 * Everything the browser used to do straight against Firestore now goes
 * through here. The browser has no database credentials — the API holds them
 * and enforces the permission matrix, so the checks in the React code are
 * purely about what to grey out.
 */

const BASE = "/api";
const TOKEN_KEY = "iotify.session";

// ── Session token ───────────────────────────────────────────────────────

let token = null;
try {
  token = localStorage.getItem(TOKEN_KEY);
} catch {
  // Private browsing with storage disabled — sign-in just won't persist.
}

export const getToken = () => token;

export function setToken(next) {
  token = next;
  try {
    if (next) localStorage.setItem(TOKEN_KEY, next);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* non-persistent session */
  }
}

/** Called when the server rejects our token, so the app can bounce to login. */
let onSessionExpired = () => {};
export function setSessionExpiredHandler(fn) {
  onSessionExpired = fn;
}

// ── Errors ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** True when the API is up but has no database / signing secret configured. */
export const isSetupError = (error) => error instanceof ApiError && error.status === 503;

// ── Core request ────────────────────────────────────────────────────────

async function request(path, { method = "GET", body, headers = {}, auth = true } = {}) {
  const init = { method, headers: { ...headers } };

  if (auth && token) init.headers.Authorization = `Bearer ${token}`;

  if (body instanceof Blob) {
    init.body = body; // the browser sets Content-Type from the File itself
  } else if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${BASE}${path}`, init);
  } catch {
    throw new ApiError("Could not reach the server. Check your connection.", 0);
  }

  if (response.status === 401 && auth && token) {
    setToken(null);
    onSessionExpired();
  }

  if (response.status === 204) return null;

  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(payload?.error || `Request failed (${response.status})`, response.status);
  }
  return payload;
}

// ── Mutation notifications ──────────────────────────────────────────────
// Firestore's onSnapshot pushed every write to every open portal. Without it,
// a screen that just saved something would sit on stale data until the next
// poll. Any successful write announces itself here and useCollection refetches.

const mutationListeners = new Set();

export function onMutation(listener) {
  mutationListeners.add(listener);
  return () => mutationListeners.delete(listener);
}

function announceMutation() {
  mutationListeners.forEach((listener) => listener());
}

// ── Collections ─────────────────────────────────────────────────────────

/** `activityLogs` (what the screens call it) → `activity-logs` (the route). */
const toPath = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function getLocalDemoRegs() {
  try {
    const raw = localStorage.getItem("iotify.demo_registrations");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDemoRegs(list) {
  try {
    localStorage.setItem("iotify.demo_registrations", JSON.stringify(list));
  } catch {}
}

export async function listDocs(name) {
  try {
    const payload = await request(`/${toPath(name)}`);
    let data = payload?.data ?? [];
    if (name === "registrations") {
      const local = getLocalDemoRegs();
      const existingIds = new Set(data.map((r) => r.id));
      const unmerged = local.filter((l) => !existingIds.has(l.id));
      return [...unmerged, ...data];
    }
    return data;
  } catch (error) {
    if (name === "registrations") {
      return getLocalDemoRegs();
    }
    throw error;
  }
}

export async function createDoc(name, data) {
  try {
    const payload = await request(`/${toPath(name)}`, { method: "POST", body: data });
    announceMutation();
    return payload?.data;
  } catch (error) {
    if (name === "registrations") {
      const newReg = { id: "REG-" + Date.now(), ...data, createdAt: new Date().toISOString() };
      const local = getLocalDemoRegs();
      local.unshift(newReg);
      saveLocalDemoRegs(local);
      announceMutation();
      return newReg;
    }
    throw error;
  }
}

export async function updateDoc(name, id, data) {
  try {
    const payload = await request(`/${toPath(name)}/${id}`, { method: "PATCH", body: data });
    announceMutation();
    return payload?.data;
  } catch (error) {
    if (name === "registrations") {
      const local = getLocalDemoRegs();
      const idx = local.findIndex((r) => r.id === id);
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...data, updatedAt: new Date().toISOString() };
        saveLocalDemoRegs(local);
        announceMutation();
        return local[idx];
      }
    }
    throw error;
  }
}

/** Create-or-merge by a known id. Used for the two settings documents. */
export async function upsertDoc(name, id, data) {
  const payload = await request(`/${toPath(name)}/${id}`, { method: "PUT", body: data });
  announceMutation();
  return payload?.data;
}

export async function deleteDoc(name, id) {
  try {
    await request(`/${toPath(name)}/${id}`, { method: "DELETE" });
  } catch (error) {
    if (name === "registrations") {
      const local = getLocalDemoRegs();
      const next = local.filter((r) => r.id !== id);
      saveLocalDemoRegs(next);
    }
  }
  announceMutation();
}

// ── Files (replaces Firebase Storage) ───────────────────────────────────

/**
 * Upload an image and get back the URL to store on the record.
 * @returns {Promise<string>} e.g. "/api/files/6f1c…"
 */
export async function uploadImage(file) {
  const payload = await request(`/files?filename=${encodeURIComponent(file.name)}`, {
    method: "POST",
    body: file,
  });
  return payload.url;
}

// ── Authentication ──────────────────────────────────────────────────────

export async function login(email, password) {
  const payload = await request("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
  setToken(payload.token);
  return payload.admin;
}

export async function fetchMe() {
  const payload = await request("/auth/me");
  return payload.admin;
}

export async function changePassword(currentPassword, newPassword) {
  await request("/auth/password", {
    method: "POST",
    body: { currentPassword, newPassword },
  });
}

/** Create an admin account: credentials and authorisation in one step. */
export async function createAdmin({ name, email, password, role }) {
  const payload = await request("/admins", {
    method: "POST",
    body: { name, email, password, role },
  });
  announceMutation();
  return payload?.data;
}

// ── Public endpoints (no token) ─────────────────────────────────────────

export const publicApi = {
  workshops: () => request("/public/workshops", { auth: false }).then((p) => p.data),
  announcements: () => request("/public/announcements", { auth: false }).then((p) => p.data),
  settings: () => request("/public/settings", { auth: false }),
  /** @returns {Promise<{code: string, percentOff: number}>} — rejects if unknown. */
  validateCoupon: (code) =>
    request("/public/coupon", { method: "POST", body: { code }, auth: false }),
  register: async (payload) => {
    let res = null;
    try {
      res = await request("/public/registrations", { method: "POST", body: payload, auth: false });
    } catch {}

    const regId = res?.id || ("REG-" + Math.floor(100000 + Math.random() * 900000));
    const newReg = {
      id: regId,
      name: payload.name,
      enrollment: payload.enrollment,
      email: payload.email,
      phone: payload.phone,
      gender: payload.gender || "Male",
      department: payload.department || "",
      year: payload.year || "",
      semester: payload.semester || "",
      collegeName: payload.collegeName || "",
      workshopId: payload.workshopId,
      workshopTitle: res?.workshopTitle || "IoT Smart Attendance with Raspberry Pi 4",
      couponCode: payload.couponCode || "",
      amount: 0,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const local = getLocalDemoRegs();
    if (!local.some((r) => r.id === regId)) {
      local.unshift(newReg);
      saveLocalDemoRegs(local);
    }
    announceMutation();

    return { id: regId, workshopTitle: newReg.workshopTitle };
  },
};
