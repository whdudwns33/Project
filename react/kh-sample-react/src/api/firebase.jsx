import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSycbGnPIH-15hGlhAU09sma_OoXz7AWo",
  authDomain: "not-awsome-prj.firebaseapp.com",
  databaseURL: "https://not-awsome-prj-default-rtdb.firebaseio.com",
  projectId: "not-awsome-prj",
  storageBucket: "not-awsome-prj.appspot.com",
  messagingSenderId: "786428754431",
  appId: "1:786428754431:web:a11935a0b473a3f9238fca",
  measurementId: "G-M0973W7B19",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
