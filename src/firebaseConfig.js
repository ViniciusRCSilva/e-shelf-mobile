// Importando funções e módulos necessários do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, arrayUnion, updateDoc, where, query, arrayRemove } from "firebase/firestore";

// Importando variáveis de ambiente contendo as chaves do Firebase
import { REACT_APP_APPID, REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET } from "../env";

// Configuração do Firebase usando as variáveis de ambiente
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_APPID,
};

// Inicializando o Firebase com a configuração fornecida
const firebase = initializeApp(firebaseConfig);

// Obtendo instâncias específicas do Firebase para autenticação e banco de dados Firestore
const auth = getAuth(firebase);
const db = getFirestore(firebase);

// Exportando os objetos e funções necessários para o uso em outros módulos
export { 
  firebase, 
  auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  db, 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  getDoc,
  arrayUnion, 
  arrayRemove, 
  updateDoc, 
  where,  
  query };
