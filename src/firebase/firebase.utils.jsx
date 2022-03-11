import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyB0hauqxsG3z2mK_G7j3FiJGB0ysnMM68U",
    authDomain: "royal-db-4f523.firebaseapp.com",
    projectId: "royal-db-4f523",
    storageBucket: "royal-db-4f523.appspot.com",
    messagingSenderId: "388269971087",
    appId: "1:388269971087:web:12532c24e4a73a217982fa",
    measurementId: "G-0TRBGSZ750"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;