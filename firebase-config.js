// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDztjy5LaQTr166sIAuFGyu7VywzuHLzYw',
  authDomain: 'todoapp-76e34.firebaseapp.com',
  databaseURL:
    'https://todoapp-76e34-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'todoapp-76e34',
  storageBucket: 'todoapp-76e34.appspot.com',
  messagingSenderId: '838015199641',
  appId: '1:838015199641:web:d94fcbf6e4d8963a698b08',
  measurementId: 'G-TFYBEQJR2V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };
