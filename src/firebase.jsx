// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqyzs4Nxifdtbri7YRINQyT_HMNxmDiyM",
  authDomain: "retaurante-app.firebaseapp.com",
  projectId: "retaurante-app",
  storageBucket: "retaurante-app.appspot.com",
  messagingSenderId: "607112422349",
  appId: "1:607112422349:web:e5f76787e13728f65c9a84",
  measurementId: "G-W6Z4FT8WMZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };

