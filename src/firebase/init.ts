import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNUMcblQf63jg8vn6YyATHnvGvliKOZ-s",
  authDomain: "invoice-app-8c67f.firebaseapp.com",
  projectId: "invoice-app-8c67f",
  storageBucket: "invoice-app-8c67f.appspot.com",
  messagingSenderId: "264542144128",
  appId: "1:264542144128:web:343835c86c0bd37005c865",
};

const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp);
