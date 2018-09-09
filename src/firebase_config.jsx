import firebase from "firebase";
const config = {
    apiKey: "AIzaSyBHmt7_mpuZ_NtWz_VOtuVuYU3cOXAWwMU",
    authDomain: "cyberkot-2018.firebaseapp.com",
    databaseURL: "https://cyberkot-2018.firebaseio.com",
    projectId: "cyberkot-2018",
    storageBucket: "cyberkot-2018.appspot.com",
    messagingSenderId: "180047507798"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;