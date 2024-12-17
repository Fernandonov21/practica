import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  // Función para obtener los usuarios de la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");
      setUsers(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llamar a la API cuando el componente se monta
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.username}</strong>: {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
