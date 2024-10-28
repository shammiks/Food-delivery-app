import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
 

const FirebaseConfig = {
  apiKey: "AIzaSyDoPbeJEiBP5GtAf7G9nlhU5lNRX7d9_yM",
  authDomain: "foodapp2-4f8f1.firebaseapp.com",
  projectId: "foodapp2-4f8f1",
  storageBucket: "foodapp2-4f8f1.appspot.com",
  messagingSenderId: "25350339877",
  appId: "1:25350339877:web:400f4dbd8d31ccc604aecc"
  };

if(!firebase.apps.length){
  firebase.initializeApp(FirebaseConfig);
}

export {firebase}
