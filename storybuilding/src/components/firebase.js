import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "storybuilding-app.firebaseapp.com",
    databaseURL: "https://storybuilding-app-default-rtdb.firebaseio.com",
    projectId: "storybuilding-app",
    storageBucket: "storybuilding-app.appspot.com",
    messagingSenderId: "80034550315",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
firebase.initializeApp(firebaseConfig);

export const app = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

