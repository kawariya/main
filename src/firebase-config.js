// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbSAnD99wKcoOOa1lnt2_bvLZTrDIs27s",
  authDomain: "kawariyachatapp.firebaseapp.com",
  projectId: "kawariyachatapp",
  storageBucket: "kawariyachatapp.appspot.com",
  messagingSenderId: "425104360669",
  appId: "1:425104360669:web:c28f7b84d316775abb4734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);