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
  let response = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return response;
}

async function addUser(name, middle,last, born) {
  try {
    const docRef = await addDoc(collection(db,"users"), {
      first: name,
      middle: middle,
      last: last,
      born: born,
    });
    console.log("Document written with ID: ", docRef.id);

  } catch (e) {
    console.error("Error adding document: ", e);

  }
}

async function updateUser(id, updates) {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updates);
    console.log("User updated");
  } catch (e) {
    console.error("Error updating user: ", e);
  }
}

async function deleteUser(id) {
  try {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    
    console.log("User deleted");

  } catch (e) {
    console.error("Error deleting user: ", e);
  }
}

export { readUsers, addUser, updateUser, deleteUser };
