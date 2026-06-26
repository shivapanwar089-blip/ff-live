// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {

  apiKey: "AIzaSyA5oyJhPtLqFjZGkQ7aB4YYiBJymIhDghA",

  authDomain: "fflive-792a5.firebaseapp.com",

  databaseURL: "https://fflive-792a5-default-rtdb.firebaseio.com",

  projectId: "fflive-792a5",

  storageBucket: "fflive-792a5.firebasestorage.app",

  messagingSenderId: "479680596017",

  appId: "1:479680596017:web:99e97fef93bb9b27c32d10"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getDatabase(app);

// Export
export { app, db };
