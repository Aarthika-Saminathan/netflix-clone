// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { 
  getFirestore, 
  addDoc, 
  collection 
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSNGO-bK8zyR6tEOeJe4FWa_jpgs4CfRc",
  authDomain: "netflix-clone-64ca8.firebaseapp.com",
  projectId: "netflix-clone-64ca8",
  storageBucket: "netflix-clone-64ca8.appspot.com",
  messagingSenderId: "401047204938",
  appId: "1:401047204938:web:96fbf192ba6fcbe14ca2b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.message); // <-- Proper error message
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" ")); // <-- Proper error message
  }
};

// Logout function
const logout = () => {
  signOut(auth)
    .then(() => {
      toast.success("Logged out successfully!");
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" ")); // <-- Proper error message
    });
};

export { auth, db, login, signup, logout };
