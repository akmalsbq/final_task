import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBRy5SaDwinyrG2rXg4d324tv2bpc9zLgc",
  authDomain: "drone-burung.firebaseapp.com",
  databaseURL: "https://drone-burung-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "drone-burung",
  storageBucket: "drone-burung.appspot.com",
  messagingSenderId: "1057732652376",
  appId: "1:1057732652376:web:c55b10e6f0f28eba20492d",
  measurementId: "G-XK9L34RJJ8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default firebaseApp