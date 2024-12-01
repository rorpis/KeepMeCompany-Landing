import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const getFirebaseConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      // Parse the JSON string from environment variable
      const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG || {});
      
      return serviceAccount;
    } catch (error) {
      console.error('Error parsing Firebase service account JSON:', error);
      throw new Error('Invalid Firebase configuration in environment', error);
    }
  } else {
    // Development: Read from local file
    try {
      return require('../../credentials_local/firestore_credentials.json');
    } catch (error) {
      console.error('Error loading Firebase credentials:', error);
      throw new Error('Firebase credentials not found in development environment');
    }
  }
};

let app;
let db;

if (typeof window !== 'undefined') {
  // Client-side initialization
  try {
    const firebaseConfig = getFirebaseConfig();

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export { app, db };
