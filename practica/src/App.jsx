import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [email, setEmail] = useState(""); // Estado para el email
  const [editingUser, setEditingUser] = useState(null); // Estado para el usuario en edición

  // Función para obtener los usuarios de la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");
      setUsers(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Función para crear un nuevo usuario 2.2
  const createUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", { username, email });
      setUsers([...users, response.data]);
      setUsername("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Función para actualizar un usuario existente
  const updateUser = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/users/${editingUser.id}`, { username, email });
      setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
      setUsername("");
      setEmail("");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser();
    } else {
      createUser();
    }
  };

  // Manejar la edición de un usuario
  const handleEdit = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setEditingUser(user);
  };

  useEffect(() => {
    fetchUsers(); // Llamar a la API cuando el componente se monta
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingUser ? "Update User" : "Create User"}</button>
      </form>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.username}</strong>: {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;



