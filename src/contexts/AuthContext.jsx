import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as api from "../lib/api";
import { clearCollections } from "../lib/useCollection";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Permission matrix. Every admin screen gates its destructive actions through
 * `can(...)` so a Volunteer cannot delete a workshop just by knowing the URL.
 * The same matrix is mirrored in api/_lib/auth.js — the copy here is for UX,
 * the API is the actual enforcement.
 */
export const ROLES = ["Super Admin", "Faculty", "Coordinator", "Volunteer"];

const PERMISSIONS = {
  "Super Admin": [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read", "settings:write", "admins:manage",
  ],
  Faculty: [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Coordinator: [
    "workshops:read", "workshops:write",
    "registrations:read", "registrations:write",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Volunteer: [
    "workshops:read",
    "registrations:read",
    "announcements:read",
    "settings:read",
  ],
};

export function AuthProvider({ children }) {
  const [adminProfile, setAdminProfile] = useState(null); // { id, name, email, role }
  const [loading, setLoading] = useState(Boolean(api.getToken()));
  const [authError, setAuthError] = useState(null);
  // The API is reachable but has no DATABASE_URL / JWT_SECRET. That is a
  // deployment problem nobody can fix by signing in differently, so it gets
  // its own screen rather than a "wrong password" style message.
  const [setupRequired, setSetupRequired] = useState(false);

  // Restore the session from the stored token. Unlike Firebase there is no
  // socket to wait on — either the token is good or it isn't.
  useEffect(() => {
    if (!api.getToken()) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    api
      .fetchMe()
      .then((admin) => {
        if (cancelled) return;
        setAdminProfile(admin);
        setAuthError(null);
      })
      .catch((error) => {
        if (cancelled) return;
        setAdminProfile(null);
        if (api.isSetupError(error)) {
          setSetupRequired(true);
          setAuthError(error.message);
        } else if (error.status === 401) {
          api.setToken(null); // expired or revoked — back to the login screen
        } else {
          setAuthError(error.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // A 401 on any later request means the session died mid-session: an admin
  // was removed, their role changed, or the token simply aged out.
  useEffect(() => {
    api.setSessionExpiredHandler(() => {
      setAdminProfile(null);
      clearCollections();
    });
    return () => api.setSessionExpiredHandler(() => {});
  }, []);

  const login = useCallback(async (email, password) => {
    const admin = await api.login(email, password);
    setAdminProfile(admin);
    setAuthError(null);
    setSetupRequired(false);
    return admin;
  }, []);

  const logout = useCallback(async () => {
    // The token is stateless, so signing out is local: drop it, and drop the
    // cached data with it so the next person to sign in on this machine never
    // sees the previous admin's rows flash up.
    api.setToken(null);
    setAdminProfile(null);
    clearCollections();
  }, []);

  const changePassword = useCallback(
    (currentPassword, newPassword) => api.changePassword(currentPassword, newPassword),
    []
  );

  const can = useCallback(
    (permission) => (PERMISSIONS[adminProfile?.role] || []).includes(permission),
    [adminProfile]
  );

  const value = {
    adminProfile,
    isAdmin: !!adminProfile,
    role: adminProfile?.role || null,
    loading,
    authError,
    setupRequired,
    can,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
