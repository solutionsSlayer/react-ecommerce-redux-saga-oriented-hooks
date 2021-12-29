import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR_nJl3EdPI6DA2wD9ekXKIY5R1j3SIFk",
  authDomain: "react-ecommerce-udemy-01.firebaseapp.com",
  projectId: "react-ecommerce-udemy-01",
  storageBucket: "react-ecommerce-udemy-01.appspot.com",
  messagingSenderId: "1054447147858",
  appId: "1:1054447147858:web:20576f57588decb884388b",
  measurementId: "G-33EP82HD95"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const store = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const singInWithGoogle = () => signInWithPopup(auth, provider);