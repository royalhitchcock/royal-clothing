import {initializeApp} from 'firebase/app';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';
import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

const config = {
    apiKey: "AIzaSyB0hauqxsG3z2mK_G7j3FiJGB0ysnMM68U",
    authDomain: "royal-db-4f523.firebaseapp.com",
    projectId: "royal-db-4f523",
    storageBucket: "royal-db-4f523.appspot.com",
    messagingSenderId: "388269971087",
    appId: "1:388269971087:web:12532c24e4a73a217982fa",
    measurementId: "G-0TRBGSZ750"
}

const firebaseApp = initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if(!snapShot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{ 
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
    // console.log(firestore.doc(snapShot));
}

firebase.initializeApp(config);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(auth, provider);

export default firebase;