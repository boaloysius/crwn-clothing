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
export {firebase_auth, firebase_firestore};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = await firebase_firestore.doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await firebase_firestore.getDoc(userRef);

  if(!snapShot.exists()){
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try{
      await firebase_firestore.setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch(error){
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}