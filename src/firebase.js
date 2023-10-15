// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYOiavIKHBlFgHM1eOyOHDr6atI7ZKLQc",
  authDomain: "clone-react-disneyplus-app.firebaseapp.com",
  projectId: "clone-react-disneyplus-app",
  storageBucket: "clone-react-disneyplus-app.appspot.com",
  messagingSenderId: "1026268547145",
  appId: "1:1026268547145:web:77b4dca601810497139798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app