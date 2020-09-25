// Get a RTDB instance
import firebase from "firebase/app";
import "firebase/database";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyAagwIzP9NTEJOcNqcKab1vMS1YvDWuIqI",
    authDomain: "eventsatucla.firebaseapp.com",
    databaseURL: "https://eventsatucla.firebaseio.com",
    projectId: "eventsatucla",
    storageBucket: "eventsatucla.appspot.com",
    messagingSenderId: "272746716705",
    appId: "1:272746716705:web:af37bb0ed1a4862f5f8d60",
    measurementId: "G-06Y4FLNCCW",
  })
  .database();
