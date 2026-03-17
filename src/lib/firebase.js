import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1dPVD4NdbnkM8OtRIaxPjtcPMN2aClxw",
  authDomain: "autobon-c7edf.firebaseapp.com",
  projectId: "autobon-c7edf",
  storageBucket: "autobon-c7edf.firebasestorage.app",
  messagingSenderId: "779140418365",
  appId: "1:779140418365:web:b25f13bc22bbdffa1d1354",
  measurementId: "G-N57F2J48R7",
};

// Only initialize on client side, and avoid double-init
let app;
let auth;
let googleProvider;
let storage;

if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  storage = getStorage(app);
}

export { auth, googleProvider, storage };
export default app;
