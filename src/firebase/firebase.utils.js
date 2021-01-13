import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCWW1lDT8zddTTbZHxDjHfSL9hZ2dWqIg4",
  authDomain: "crwn-db-32b84.firebaseapp.com",
  databaseURL: "https://crwn-db-32b84.firebaseio.com",
  projectId: "crwn-db-32b84",
  storageBucket: "crwn-db-32b84.appspot.com",
  messagingSenderId: "304406433001",
  appId: "1:304406433001:web:7b300b81b784df334d3478"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
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
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;