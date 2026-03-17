"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

// Known admin credentials (dev fallback when backend is offline)
const ADMIN_CREDENTIALS = {
  email: "admin@autobon.ca",
  password: "admin123456",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore from localStorage immediately
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          setUser(parsed);
          // If backend-auth user (admin), skip Firebase listener
          if (parsed._backendAuth || parsed._localAdmin) {
            setLoading(false);
            return;
          }
        }
      }
    } catch {}

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          email: firebaseUser.email,
          role: "USER",
          photoURL: firebaseUser.photoURL,
        };
        firebaseUser.getIdTokenResult().then((tokenResult) => {
          if (tokenResult.claims.admin) userData.role = "ADMIN";
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setLoading(false);
        }).catch(() => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setLoading(false);
        });
      } else {
        // Don't clear local admin / backend auth users
        const stored = localStorage.getItem("user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?._backendAuth || parsed?._localAdmin) return;
          } catch {}
        }
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Login: tries backend API → hardcoded admin fallback → Firebase
  const login = useCallback(async (email, password) => {
    // 1. Try backend API first
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role || "USER",
          _backendAuth: true,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch {
      // Backend not reachable
    }

    // 2. Check hardcoded admin (dev fallback when backend is offline)
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const adminUser = {
        id: "admin-local",
        name: "Admin",
        email: ADMIN_CREDENTIALS.email,
        role: "ADMIN",
        _localAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return adminUser;
    }

    // 3. Fall back to Firebase
    if (!auth) throw new Error("Auth not initialized");
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    if (!auth) throw new Error("Auth not initialized");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    return result.user;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) throw new Error("Auth not initialized");
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  }, []);

  const setUserData = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    if (auth) { try { await signOut(auth); } catch {} }
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
