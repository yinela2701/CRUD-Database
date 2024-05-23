import {
  addDoc,
  doc,
  collection,
  getDocs,
  where,
  documentId,
  query,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";

async function readUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let response = querySnapshot.docs.map((doc) => doc.data());
  return response;
}

async function readUserById() {
  const docRef = doc(db, "collection_1/documento");
  const querySnapshot = await getDoc(docRef);
  console.log("querySnapshot.docs", querySnapshot.get());
  return null;
}

async function getDocument(coll, id) {
  const docRef = doc(db, coll, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  else return null;
}

async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateUser() {

  try {
    // Obtener el ID del primer usuario
    const querySnapshot = await getDocs(collection(db, "users"));
    const firstUserDoc = querySnapshot.docs[0]; // se puede referenciar por posición 
    const userId = firstUserDoc.id;

    console.log("ID del primer usuario:", userId);

    // Actualizar el año de nacimiento del primer usuario
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { born: 1999 });
    console.log("Document successfully updated");

  } catch (e) {
    console.error("Error updating document: ", e);
  }

}

async function deleteUser() {

  try {
    // Obtener el ID del primer usuario
    const querySnapshot = await getDocs(collection(db, "users"));
    const firstUserDoc = querySnapshot.docs[1]; // se puede referenciar por posición 
    const userId = firstUserDoc.id;

    console.log("ID del segundo usuario:", userId);

    // Actualizar el año de nacimiento del primer usuario
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    
    console.log("Second user deleted");

  } catch (e) {
    console.error("Error deleting second user: ", e);
  }

}



export { readUsers, addUser, readUserById, updateUser, deleteUser };
