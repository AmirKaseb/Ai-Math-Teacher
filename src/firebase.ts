import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyjb2mkhuykTXa4XqCPnWWIl4nZB6uG88",
  authDomain: "ai-math-teacher.firebaseapp.com",
  projectId: "ai-math-teacher",
  storageBucket: "ai-math-teacher.firebasestorage.app",
  messagingSenderId: "570839111082",
  appId: "1:570839111082:web:ea8b9b14b8a16f9bc007d3",
  measurementId: "G-CB3QF2QHGZ"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);