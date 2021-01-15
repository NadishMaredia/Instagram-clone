import firebase from 'firebase';

const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAoa9BV1thHWYP4FhpZabNAYrNe3gUxqDE",
    authDomain: "instagram-clone-3303b.firebaseapp.com",
    projectId: "instagram-clone-3303b",
    storageBucket: "instagram-clone-3303b.appspot.com",
    messagingSenderId: "742141041308",
    appId: "1:742141041308:web:68b3c255e89be8c1fe6b59",
    measurementId: "G-M7N2TFDXNM"
});

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };