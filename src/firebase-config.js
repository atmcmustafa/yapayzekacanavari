import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleAuthProvider = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleAuthProvider = new GoogleAuthProvider();
} catch (e) {
  console.warn("Firebase initialization failed:", e.message);
}

export { auth, db, storage, googleAuthProvider };

export const uploadProfilePicture = async (userId, file) => {
  if (!file || !storage) return;
  const fileRef = ref(storage, `profilePictures/${userId}`);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL;
};
