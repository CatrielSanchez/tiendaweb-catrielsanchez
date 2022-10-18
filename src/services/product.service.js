import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe706qRqMsn3IgCkEiyzj7tSQ47-kaTxE",
  authDomain: "catriel-237da.firebaseapp.com",
  projectId: "catriel-237da",
  storageBucket: "catriel-237da.appspot.com",
  messagingSenderId: "847921432527",
  appId: "1:847921432527:web:a58f365d3f3d40c460f4ba",
};

export function initFirebase() {
  initializeApp(firebaseConfig);
}

export async function getAllProducts(category) {
  const db = getFirestore();
  const queryBase = collection(db, "products");
  const querySnapshot = category
    ? query(queryBase, where("category", "==", category))
    : queryBase;

  return getDocs(querySnapshot).then((response) =>
    response.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );
}

export function getProductById(id) {
  const db = getFirestore();
  const queryDoc = doc(db, "products", id);

  return getDoc(queryDoc).then((response) => ({
    id: response.id,
    ...response.data(),
  }));
}
