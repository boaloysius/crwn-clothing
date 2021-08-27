import * as firebase from 'firebase/app';
import * as firebase_auth from 'firebase/auth';
import * as firebase_firestore from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCOtkSmFHiswdOOCiFwWqp77QkScp0Bpmk",
    authDomain: "crwn-db-aedd8.firebaseapp.com",
    projectId: "crwn-db-aedd8",
    storageBucket: "crwn-db-aedd8.appspot.com",
    messagingSenderId: "495609347869",
    appId: "1:495609347869:web:d6d98446b89c2f1d32abf4",
    measurementId: "G-Z96YX7RDDZ"
  };

firebase.initializeApp(config);

export const auth = firebase_auth.getAuth();
export const firestore = firebase_firestore.getFirestore();
const provider = new firebase_auth.GoogleAuthProvider();
//provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => firebase_auth.signInWithPopup(auth, provider);

export default firebase;
export {firebase_auth};