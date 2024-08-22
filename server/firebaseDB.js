// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY0gha0t_8-TMoM4sKB2CLNziVL2HoZbA",
  authDomain: "reservafacilapp-7b9a7.firebaseapp.com",
  projectId: "reservafacilapp-7b9a7",
  storageBucket: "reservafacilapp-7b9a7.appspot.com",
  messagingSenderId: "294002233325",
  appId: "1:294002233325:web:8a37d42a7fac5397f6a1e4",
  measurementId: "G-EHWFQDEYHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
