import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAmhBUBMMDBCh10VmfVRvoCNiJrXxDdQls",
    authDomain: "olx-project-f920f.firebaseapp.com",
    projectId: "olx-project-f920f",
    storageBucket: "olx-project-f920f.appspot.com",
    messagingSenderId: "683563851685",
    appId: "1:683563851685:web:5e2c31251972bd2d40d24c",
    measurementId: "G-3W02W6V1M0"
  };

  export const firebase=initializeApp(firebaseConfig)
  export const auth =getAuth(firebase);
 export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);