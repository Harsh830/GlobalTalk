import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqMg4dMA8ZTTM3_kudC8yZH1auA5ix9sA",
  authDomain: "globaltalk-2bde5.firebaseapp.com",
  projectId: "globaltalk-2bde5",
  storageBucket: "globaltalk-2bde5.firebasestorage.app",
  messagingSenderId: "48446575460",
  appId: "1:48446575460:web:8d7f423049cc80aa07a071",
  measurementId: "G-XMVFH6DNEQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
