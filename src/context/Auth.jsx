import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import { googleAuthProvider } from "../firebase-config";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // Kayıt fonksiyonu
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //google eklentisi

  function googleSignIn(callback) {
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        toast.success("Giriş başarılı, yönlendiriliyorsunuz.. ");
        callback();
      })
      .catch((error) => {
        toast.error("Giriş başarısız. Lütfen tekrar deneyiniz.");
        console.error(error);
      });
  }

  // Giriş fonksiyonu
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOutUser() {
    toast.success("Çıkış yapılıyor... ");
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          toast.success("Çıkış başarılı. ");
        })
        .catch((error) => {
          toast.error("Bir hatayla karşılaştık. Tekrar deneyiniz.");
          console.log(error);
        });
    }, 2000);
  }

  const value = {
    currentUser,
    register,
    login,
    signOutUser,
    googleSignIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
