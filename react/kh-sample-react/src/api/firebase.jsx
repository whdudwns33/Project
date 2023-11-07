import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCphqOtWHhIegf9J2WZH4CN1g_3bwmbdNg",
  authDomain: "mini-project-gpt.firebaseapp.com",
  projectId: "mini-project-gpt",
  storageBucket: "mini-project-gpt.appspot.com",
  messagingSenderId: "879643543017",
  appId: "1:879643543017:web:6da40ef4bcc9758e2eb778",
  measurementId: "G-FK3EZF3LZY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
