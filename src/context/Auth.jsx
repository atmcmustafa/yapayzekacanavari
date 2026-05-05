import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase-config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn(email, password) {
    if (!auth) throw new Error("Auth not available");
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, password, displayName) {
    if (!auth) throw new Error("Auth not available");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(result.user, { displayName });
    return result;
  }

  async function signInWithGoogleFn() {
    if (!auth || !googleAuthProvider) throw new Error("Auth not available");
    return signInWithPopup(auth, googleAuthProvider);
  }

  async function signOutUser() {
    if (!auth) return;
    return signOut(auth);
  }

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle: signInWithGoogleFn,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
