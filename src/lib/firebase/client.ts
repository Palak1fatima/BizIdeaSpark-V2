
'use client';

import { initializeApp, getApps, getApp, FirebaseError } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, type User, signOut, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  "projectId": "ideaspark-s803j",
  "appId": "1:764324658377:web:acb00f5c994067d91e6118",
  "storageBucket": "ideaspark-s803j.firebasestorage.app",
  "apiKey": "AIzaSyCL_dDkyjCiz1rW3Qho2njq1qbVbnckIXw",
  "authDomain": "ideaspark-s803j.firebaseapp.com",
  "messagingSenderId": "764324658377",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics if supported
if (typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            getAnalytics(app);
        }
    });
}

export { app, auth, db, FirebaseError, signInAnonymously, onAuthStateChanged, type User, signOut, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink };
