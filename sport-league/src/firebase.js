import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDIN9ytNNnloOCkaw37dVeUevNixOEY9c8",
  authDomain: "mcity-97479.firebaseapp.com",
  databaseURL: "https://mcity-97479.firebaseio.com",
  projectId: "mcity-97479",
  storageBucket: "mcity-97479.appspot.com",
  messagingSenderId: "411233959072"
};

firebase.initializeApp(config);

const firebaseDB=firebase.database();

const firebaseMatches=firebaseDB.ref('matches');

const firebasePromotions=firebaseDB.ref('promotions');

const firebaseTeams=firebaseDB.ref('teams');

const firebasePlayers=firebaseDB.ref('players');


export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
}