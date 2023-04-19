import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjriXa1R2QsaFQEhNJLjqzY8OC0hfzoyM",
  authDomain: "twitter-clone-839a9.firebaseapp.com",
  projectId: "twitter-clone-839a9",
  storageBucket: "twitter-clone-839a9.appspot.com",
  messagingSenderId: "254911050420",
  appId: "1:254911050420:web:0749091df8fe58abfb5de1",
  measurementId: "G-VM70DJE9BJ",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = getStorage();
