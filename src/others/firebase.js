import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const auth = app.auth();
const fb = firebase.firestore();
fb.settings({ timestampsInSnapshots: true, merge: true });

export { fb, auth };
export default app;

export const createUserDocument = async(user, additionalData) => {
    if (!user) return;

    const userRef = fb.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        try {
            userRef.set({
                uid: user.uid,
                email: user.email,
                displayName: additionalData.displayName,
                role: additionalData.role,
                createAt: new Date(),
            });
        } catch (error) {
            console.log("Failed to create user!, ", error.message);
        }
    }
};