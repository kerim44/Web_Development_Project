
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

  //// Get Firebase Database reference.
  var firepadRef = getExampleRef();

  //// Create ACE
  var editor = ace.edit("firepad");
  editor.setTheme("ace/theme/textmate");
  var session = editor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/javascript");

  //// Create Firepad.
  var firepad = Firepad.fromACE(firepadRef, editor, {
    defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
  });
  
}