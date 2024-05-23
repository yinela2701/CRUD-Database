import { useEffect, useState } from "react";
import "./App.css";
import { readUsers, addUser, updateUser, deleteUser } from "./core/service/firebase/db/users";
import { db } from "./core/service/firebase/firebase";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUsersCallBack();
  }, []);

  let getUsersCallBack = async () => {
    let response = await readUsers(db);
    console.log("response ", response);
  };

  return (
    <>
      <button onClick={() => addUser(db)}>Añadir Caracter</button>
      <button onClick={() => updateUser(db)}>Actualizar primer usuario</button>
      <button onClick={() => deleteUser(db)}>Borrar el segundo usuario</button>
    </>
  );
}

export default App;
