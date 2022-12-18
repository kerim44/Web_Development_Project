
import { initializeApp } from "firebase/app";

function init() {
  // Initialize Firebase.
  var config = {
    apiKey: "AIzaSyBOuCWrezIyym-41Sj2TDylNqNEX_QNvZo",
    authDomain: "webdev-c90c5.firebaseapp.com",
    projectId: "webdev-c90c5",
    storageBucket: "webdev-c90c5.appspot.com",
    messagingSenderId: "38334752607",
    appId: "1:38334752607:web:886d59914780b1cd4db8ea"
  };
  firebase.initializeApp(config);
}