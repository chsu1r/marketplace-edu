
import app from 'firebase/app';
import 'firebase/auth';

var prodConfig = {}
var devConfig = {
    apiKey: process.env.REACT_APP_STAGING_FIREBASE_API_KEY,
    authDomain: "marketplace-edu-staging.firebaseapp.com",
    databaseURL: "https://marketplace-edu-staging.firebaseio.com",
    projectId: "marketplace-edu-staging",
    storageBucket: "marketplace-edu-staging.appspot.com",
    messagingSenderId: "971511782436",
    appId: "1:971511782436:web:f94a61caa5f6455dc78cb1",
    measurementId: "G-8VPRQL7BFE"
};

const config =
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;