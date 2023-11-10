import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCj6Vw3OCLAVoW_hSrGEulaxgvQ1BBeRwI",
  authDomain: "e-shelf-mobile-test.firebaseapp.com",
  projectId: "e-shelf-mobile-test",
  storageBucket: "e-shelf-mobile-test.appspot.com",
  messagingSenderId: "651217450801",
  appId: "1:651217450801:web:64e57d8524748fac0aa210"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);