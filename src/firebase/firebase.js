import firebase from 'firebase/compat/app';
import 'firebase/firestore';
// import "firebase/compat/auth";
// import "firebase/compat/database";
import "firebase/compat/storage";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyClp8vA5ydcUQzEqb9g92qypn0c6h80Bdg",
  authDomain: "wordle-83f95.firebaseapp.com",
  projectId: "wordle-83f95",
  storageBucket: "wordle-83f95.appspot.com",
  messagingSenderId: "629533156699",
  appId: "1:629533156699:web:d181b30762dce633ea267e",
  measurementId: "G-TTZLNKKYB7",
  databaseURL:"https://wordle-83f95-default-rtdb.firebaseio.com/"
};
if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

const firebaseApp = initializeApp(config);

// ** Modulerized Firebase ** //
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);
const db1 = getDatabase(firebaseApp);
//const storage = getStorage(firebaseApp);
const storage = firebase.storage();
//const fs=firebase.firestore();
let user = auth.currentUser;

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

//separting database API and authentication
// const db = firebase.database();
// const db1=firebase.database();
// const auth = firebase.auth();
// const storage = firebase.storage();
// let user = firebase.auth().currentUser;
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

// const googleProvider = new firebase.auth.GoogleAuthProvider();

export {
  user,
  db1,
  db,
  auth,
  facebookProvider,
  googleProvider,
  firebaseApp as firebase,
  storage,
  firestore,

};
