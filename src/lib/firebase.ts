import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWCuw_2DhART_X8TClit3L6Ovx-btbYoI",
  authDomain: "x2818studios.firebaseapp.com",
  projectId: "x2818studios",
  storageBucket: "x2818studios.firebasestorage.app",
  messagingSenderId: "977813650493",
  appId: "1:977813650493:web:8996cf6048d9e0b3357e54",
  measurementId: "G-01ZPY9EVNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Export Firebase Storage functions
export { ref, listAll, getDownloadURL };