// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOTC6LuQXSpE8XD1mf2kj1GWBeUUFgEQI',
  authDomain: 'todoapp-eeb31.firebaseapp.com',
  databaseURL:
    'https://todoapp-eeb31-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'todoapp-eeb31',
  storageBucket: 'todoapp-eeb31.appspot.com',
  messagingSenderId: '163866271465',
  appId: '1:163866271465:web:1628813196ec070cf0da78',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
