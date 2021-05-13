import firebase from "firebase/app"
import 'firebase/firestore'


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC35te1W2sCf88jzHb-mpWHHuN33tKw7wY",
  authDomain: "todolist-46332.firebaseapp.com",
  databaseURL: "https://todolist-46332-default-rtdb.firebaseio.com",
  projectId: "todolist-46332",
  storageBucket: "todolist-46332.appspot.com",
  messagingSenderId: "289928008413",
  appId: "1:289928008413:web:e2820f7488fe1d86a04134"
});

export { firebaseConfig as firebase}