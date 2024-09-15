// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore,collection,addDoc, getDocs, query,where} from "firebase/firestore" 

// const firebaseConfig = { 
//   apiKey : "AIzaSyBf7MlyTB4UtJ9jKi3o4J_W14qsYsGiGko" , 
//   authDomain : "meal-a237b.firebaseapp.com" , 
//   projectId : "meal-a237b" , 
//   storageBucket : "meal-a237b.appspot.com" , 
//   messagingSenderId : "686223253907" , 
//   appId : "1:686223253907:web:8bf19869be3847c7230866" 
// };

const firebaseConfig = {
  apiKey: "AIzaSyBf7MlyTB4UtJ9jKi3o4J_W14qsYsGiGko",
  authDomain: "meal-a237b.firebaseapp.com",
  projectId: "meal-a237b",
  storageBucket: "meal-a237b.appspot.com",
  messagingSenderId: "686223253907",
  appId: "1:686223253907:web:8bf19869be3847c7230866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

const registerUser = (email,password) => createUserWithEmailAndPassword(auth,email,password)
const loginUser = (email,password) => signInWithEmailAndPassword(auth,email,password)
const logoutUser =() => signOut(auth)

const addData= (tableName, data) =>addDoc(collection(db,tableName),data)

const getDataWhere = (tableName,column, operator,value) => getDocs(query(collection(db,tableName),where(column,operator,value)))
export {registerUser,loginUser,logoutUser,addData,getDataWhere, auth}

export default app