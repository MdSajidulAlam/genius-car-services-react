// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJkiujnbgLAcScvTQQTbrXZhYkMDQegb4",
    authDomain: "genius-car-services-ef754.firebaseapp.com",
    projectId: "genius-car-services-ef754",
    storageBucket: "genius-car-services-ef754.appspot.com",
    messagingSenderId: "526076168668",
    appId: "1:526076168668:web:602367c2a5d6414d20a719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth