// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


// YOUR FIREBASE CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyA50yJhPtLqfjZGkQ7aB4YYiBJymInDghA",
  authDomain: "fflive-792a5.firebaseapp.com",
  databaseURL: "https://fflive-792a5-default-rtdb.firebaseio.com",
  projectId: "fflive-792a5",
  storageBucket: "fflive-792a5.firebasestorage.app",
  messagingSenderId: "479680596017",
  appId: "1:479680596017:web:99e9f7ef93bb9b27c32d10"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// EXPORTS

window.db = db;
window.ref = ref;
window.push = push;
window.set = set;
window.update = update;
window.remove = remove;
window.onValue = onValue;
