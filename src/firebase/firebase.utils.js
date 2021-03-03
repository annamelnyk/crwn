import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import collection from '../pages/collection/collection';

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
  const collectionRef = firestore.collection('users');
  const collectionSnapshot = await collectionRef.get();
  console.log('collectionSnapshot ', collectionSnapshot);
  // retrive data from snapshot objects
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data())});

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
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};


firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // Пакет записи(batch), используемый для выполнения нескольких операций записи
  // как одной атомарной единицы. Если пропадет интернет, чтоб записались все данные, а не половина 
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {

    // Create new document references and randomly generates 'id'.
    // Если передать аргумент в 'collectionRef.doc()' - он запишется в id 
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return { 
      routName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,

     };
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    
    return acc;
  }, {});
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;