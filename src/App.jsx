import { useEffect, useState } from "react";
import "./App.css";
import { readUsers, addUser, updateUser, deleteUser } from "./core/service/firebase/db/users";
import { db } from "./core/service/firebase/firebase";

function App() {

  const [users, setUsers] = useState([]);

  const handleReadUsers = async () => {
    try {
      const data = await readUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error reading users: ", error);
    }
  };

  const handleUpdateUser = async () => {
    const idInput = document.getElementById('id-input').value;
    const nameInput = document.getElementById('name-input').value;
    const middleInput = document.getElementById('middle-input').value;
    const lastInput = document.getElementById('last-input').value;
    const bornInput = document.getElementById('born-input').value;

    const updates = {};
    if (nameInput) updates.first = nameInput;
    if (middleInput) updates.middle = middleInput;
    if (lastInput) updates.last = lastInput;
    if (bornInput) updates.born = bornInput;

    if (Object.keys(updates).length > 0 && idInput) {
      await updateUser(idInput, updates);
    } else {
      console.error("ID input is empty or no fields to update.");
    }
  };

  return (
    <>
    <div name="Entradas">
      <input type="text" id="id-input" placeholder="Id para actualizar" />
      <input type="text" id="name-input" placeholder="First Name" />
      <input type="text" id="middle-input" placeholder="Middle Name" />
      <input type="text" id="last-input" placeholder="Last Name" />
      <input type="number" id="born-input" placeholder="Year of Birth" />
    </div>
    <button onClick={handleReadUsers}>Ver usuarios</button>

    <button
      onClick={async () => {

        const nameInput = document.getElementById('name-input').value;
        const middleInput = document.getElementById('middle-input').value;
        const lastInput = document.getElementById('last-input').value;
        const bornInput = document.getElementById('born-input').value;

        await addUser(nameInput, middleInput, lastInput, bornInput);
         
      }}
    >
      Añadir Usuario
    </button>

    <button onClick={handleUpdateUser}>Actualizar Usuario</button>

    <button
      onClick={async () => {
        const idInput = document.getElementById('id-input').value;
        await deleteUser(idInput);
         
      }}
    >
      Eliminar Usuario
    </button>

      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={user.id}>
                Id: {user.id} - {user.first} {user.middle} {user.last} - Born: {user.born}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

    </>
  );
}

export default App;
