import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBixuIEV1-OhA06DOcu3ysZJSSDpLIyHBY",
    authDomain: "instagram-start.firebaseapp.com",
    projectId: "instagram-start",
    storageBucket: "instagram-start.appspot.com",
    messagingSenderId: "160206197903",
    appId: "1:160206197903:web:c65127eb8939a8a5d84cfa",
    measurementId: "G-E4EYRDCZ2V"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
