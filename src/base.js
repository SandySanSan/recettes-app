import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCvYGNMldZJC1qid-bX38Ui_AtMuTXVjfU",
  authDomain: "recettesapp.firebaseapp.com",
  databaseURL: "https://recettesapp.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
