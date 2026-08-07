import { useEffect, useState } from "react";
import { listDocs, onMutation } from "./api";

/**
 * Live view of an API collection. Returns [data, loading, error].
 *
 * Firestore pushed changes over a socket; Postgres behind a serverless API
 * can't, so "live" here is two things working together:
 *
 *   1. any successful write anywhere in the app announces itself (api.js) and
 *      every mounted collection refetches — this is what makes an approval or
 *      a new workshop appear immediately on the screen that made it;
 *   2. a background poll while the tab is visible, which is what carries a
 *      change made on someone else's machine across.
 *
 * Requests for the same collection share one in-flight fetch and one cache
 * entry, so three screens reading `registrations` cost one round trip.
 *
 * Sorting and filtering stay client-side, as they were: these collections are
 * hundreds of rows, and it keeps every filter combination working without a
 * bespoke endpoint per screen.
 */

const POLL_INTERVAL_MS = 20_000;
const REFRESH_DEBOUNCE_MS = 300;

/** name → { data, loading, error } */
const cache = new Map();
/** name → Set<setState> */
const subscribers = new Map();
/** name → Promise, so parallel mounts don't each fire a request */
const inFlight = new Map();

const initialState = { data: [], loading: true, error: null };

function publish(name, state) {
  cache.set(name, state);
  subscribers.get(name)?.forEach((notify) => notify(state));
}

// ── Sync status ─────────────────────────────────────────────────────────
// Polling is a weaker promise than a live socket, so the portal says so out
// loud in the top bar instead of letting stale numbers pass for current ones.
const syncListeners = new Set();
let syncState = { lastSyncedAt: null, syncing: false };

function setSyncState(next) {
  syncState = { ...syncState, ...next };
  syncListeners.forEach((notify) => notify(syncState));
}

function fetchCollection(name) {
  if (inFlight.has(name)) return inFlight.get(name);

  setSyncState({ syncing: true });

  const promise = listDocs(name)
    .then((data) => {
      publish(name, { data, loading: false, error: null });
      setSyncState({ lastSyncedAt: new Date() });
    })
    .catch((error) => {
      console.error(`Failed to load "${name}"`, error);
      // Keep whatever we already had on screen rather than blanking the table.
      publish(name, { data: cache.get(name)?.data ?? [], loading: false, error });
    })
    .finally(() => {
      inFlight.delete(name);
      if (inFlight.size === 0) setSyncState({ syncing: false });
    });

  inFlight.set(name, promise);
  return promise;
}

/** @returns {{lastSyncedAt: Date|null, syncing: boolean}} */
export function useSyncState() {
  const [state, setState] = useState(syncState);

  useEffect(() => {
    syncListeners.add(setState);
    setState(syncState);
    return () => syncListeners.delete(setState);
  }, []);

  return state;
}

/** Refetch every collection currently on screen. */
function refreshAll() {
  subscribers.forEach((listeners, name) => {
    if (listeners.size > 0) fetchCollection(name);
  });
}

// Writes arrive in bursts — "approve all in view" fires one per row. Coalesce
// them into a single refresh instead of one round trip per record.
let refreshTimer = null;
onMutation(() => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refreshAll, REFRESH_DEBOUNCE_MS);
});

// Polling is paused on a hidden tab; coming back checks straight away, so
// switching to the portal never shows stale numbers.
if (typeof document !== "undefined") {
  setInterval(() => {
    if (document.visibilityState === "visible") refreshAll();
  }, POLL_INTERVAL_MS);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refreshAll();
  });
}

/**
 * @param {"workshops"|"registrations"|"announcements"|"settings"|"admins"|"activityLogs"} name
 * @returns {[Array, boolean, Error|null]}
 */
export function useCollection(name) {
  const [state, setState] = useState(() => cache.get(name) ?? initialState);

  useEffect(() => {
    setState(cache.get(name) ?? initialState);

    if (!subscribers.has(name)) subscribers.set(name, new Set());
    const listeners = subscribers.get(name);
    listeners.add(setState);

    fetchCollection(name);

    return () => {
      listeners.delete(setState);
    };
  }, [name]);

  return [state.data, state.loading, state.error];
}

/** Force an immediate refetch — for a "Retry" button. */
export function refreshCollections() {
  refreshAll();
}

/** Drop every cached collection. Called on sign-out so the next admin to sign
 *  in on this machine never sees the previous one's data flash up. */
export function clearCollections() {
  cache.clear();
  subscribers.forEach((listeners) => listeners.forEach((notify) => notify(initialState)));
}

/** ISO string | Date | null → Date | null */
export function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Human-readable date-time, or a placeholder. */
export function formatDateTime(value) {
  const d = toDate(value);
  if (!d) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
