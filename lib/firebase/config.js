"use client";

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let app;
let db;

export const getClientFirebaseConfig = () => {
  if (typeof window === 'undefined') return {};
  
  /* const config = getFirebaseConfig(); */
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_appId,
    /* measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_measurementId */
  };
};

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp({
    apiKey: `AIzaSyBap0GJ9EogEOqRpaerGtXvysfam2n93cw`,
    authDomain: `keepmecompanyai.firebaseapp.com`,
    projectId: `keepmecompanyai`,
    storageBucket: `keepmecompanyai.firebasestorage.app`,
    messagingSenderId: `1099500018898`,
    appId: `1:1099500018898:web:02b80dc6f1be388979a10b`,
  });
  db = getFirestore(app);
}

export { app, db };
