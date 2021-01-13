import firebase from 'firebase/app';
import 'firebase/firestore';

// variants how we can get 'documents' and 'collections' from Firestore

const firestore = firebase.firestore();

// get the doc 1 
firestore
  .collection('users')
  .doc('NwJobPe15HVxEOIAZ8u0')
  .collection('cartItems')
  .doc('EjOl6QzOj2ePj8ADHctx');

// get the doc 2
firestore
  .doc('/users/NwJobPe15HVxEOIAZ8u0/cartItems/EjOl6QzOj2ePj8ADHctx');

// get the collection  
firestore.collection('/users/NwJobPe15HVxEOIAZ8u0/cartItems');  