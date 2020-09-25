// Get a RTDB instance
import firebase from "firebase/app";
import "firebase/database";

import { firebaseConfig } from "./firebaseConfig";

export const db = firebase.initializeApp(firebaseConfig).database();
