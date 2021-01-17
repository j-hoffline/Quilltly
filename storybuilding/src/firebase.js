import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpQ6esX-acPquLk3bLwhyE7pQHmxEHVek",
    authDomain: "storybuilding-app.firebaseapp.com",
    databaseURL: "https://storybuilding-app-default-rtdb.firebaseio.com",
    projectId: "storybuilding-app",
    storageBucket: "storybuilding-app.appspot.com",
    messagingSenderId: "80034550315",
    appId: "1:80034550315:web:69ebdca915d9441254106e"
  };
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

