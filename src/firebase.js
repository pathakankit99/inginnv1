// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBIcv_gvm5fOZ489q8tTBZ8oFhFyXV1aQI",
  authDomain: "inginnweb.firebaseapp.com",
  databaseURL: "https://inginnweb.firebaseio.com",
  projectId: "inginnweb",
  storageBucket: "inginnweb.appspot.com",
  messagingSenderId: "1073818245431",
  appId: "1:1073818245431:web:cc5456c567a20fa256e2b2",
  measurementId: "G-X5PHG4D6XX"
  });
  

  const db = firebaseApp.firestore()

  export  {db}
