import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPR8lmFGKJD1khJv_JgouOV2Zcod2lApw",
  authDomain: "calendar-app-b3783.firebaseapp.com",
  projectId: "calendar-app-b3783",
  storageBucket: "calendar-app-b3783.appspot.com",
  messagingSenderId: "780916132486",
  appId: "1:780916132486:web:06d06731d722999e555f07",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
