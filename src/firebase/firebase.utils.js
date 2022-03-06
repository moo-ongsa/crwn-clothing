import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

// Follow this pattern to import other Firebase services

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuBqUl12RhxhXmtBtZOXQOERYl_o_Aa6k",
    authDomain: "crwn-db-d9567.firebaseapp.com",
    projectId: "crwn-db-d9567",
    storageBucket: "crwn-db-d9567.appspot.com",
    messagingSenderId: "20745098333",
    appId: "1:20745098333:web:e3eb2fe4b19562ab7529b4",
    measurementId: "G-WYRX2K3XH6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = doc(db, "users", userAuth.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            console.log("created user", userAuth)
        }
        catch (error) {
            console.log("error creating user ", error.message)
        }
    } else {
        console.log("users", docSnap.data())
    }

    return userRef
}

export const auth = getAuth();
auth.languageCode = 'it';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'propmt': 'select_account'
});

export const signInWithGoogle = () => signInWithPopup(auth, provider)

export const signOutWithGoogle = () => signOut(auth)
