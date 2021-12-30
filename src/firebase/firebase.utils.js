import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR_nJl3EdPI6DA2wD9ekXKIY5R1j3SIFk",
  authDomain: "react-ecommerce-udemy-01.firebaseapp.com",
  projectId: "react-ecommerce-udemy-01",
  storageBucket: "react-ecommerce-udemy-01.appspot.com",
  messagingSenderId: "1054447147858",
  appId: "1:1054447147858:web:20576f57588decb884388b",
  measurementId: "G-33EP82HD95"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(db, 'users', userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return userRef;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const singInWithGoogle = () => signInWithPopup(auth, provider);