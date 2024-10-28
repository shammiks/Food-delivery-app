import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
 

const FirebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ",
  appId: ""
  };

if(!firebase.apps.length){
  firebase.initializeApp(FirebaseConfig);
}

export {firebase}
