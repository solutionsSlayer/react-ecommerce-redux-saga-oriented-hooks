import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc, writeBatch } from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
  const batch = writeBatch(db);

  documentsToAdd.forEach(docToAdd => {
    const title = docToAdd.title.toLowerCase()
    const newDocRef = doc(db, collectionKey, title);
    batch.set(newDocRef, {...docToAdd});
  });

  await batch.commit();
}

export const convertCollectionSnapshotToMap = collection => {
  const transformedCollections = collection.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    }
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator;
  }, {});
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
} 

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const singInWithGoogle = () => signInWithPopup(auth, googleProvider);