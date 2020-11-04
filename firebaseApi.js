//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Specifies which firebase project your application is connected with.
//---------------------------------------------------------------------

var firebaseConfig = {
    // Your API stuff goes here;  get it from firebase console
    apiKey: "AIzaSyAb9IXUyGZDfwBPYhl4ahW244v55lpTyv8",
    authDomain: "sovereign-realm.firebaseapp.com",
    databaseURL: "https://sovereign-realm.firebaseio.com",
    projectId: "sovereign-realm",
    storageBucket: "sovereign-realm.appspot.com",
    messagingSenderId: "160603799090",
    appId: "1:160603799090:web:31c23cc103ea356734462b",
    measurementId: "G-6CJRELT6MQ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Create the Firestore database object
  // Henceforce, any reference to the database can be made with "db"
  const db = firebase.firestore();