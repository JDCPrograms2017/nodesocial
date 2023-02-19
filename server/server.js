import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const express = require('express');
const bodyParser = require('body-parse');
const expressapp = express();

app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCW27AdN_XZINa7yGkEElHhv_Iw7sYVNKs",
    authDomain: "nodesocial-742c2.firebaseapp.com",
    projectId: "nodesocial-742c2",
    storageBucket: "nodesocial-742c2.appspot.com",
    messagingSenderId: "518737948604",
    appId: "1:518737948604:web:d8c419976ca331e7c045b9",
    measurementId: "G-K477B38MK2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();
const form = document.querySelector('thisform');

form.addEventListener('submit', async (event) => {
    console.log("heard!");
    event.preventDefault();
    signInAnonymously(auth).then(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                app.post('/insert', (req, res) => {
                    const data = {
                        username: req.body.name,
                        useremail: req.body.email,
                        userphone: req.body.phone
                    };
                
                    setDoc(doc(db, "interests", `${uid}`), data);
                // ...
                });

            } else {
                console.log("Bye bye user!");
            }
        });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});