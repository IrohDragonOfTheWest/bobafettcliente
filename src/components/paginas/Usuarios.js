import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebase from '../../firebase/firebase';


const auth = firebase.auth;
const firestore = getFirestore(firebase.firestore);
function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(firestore, 'usuarios');
      const usersSnapshot = await getDocs(usersCollection);
      const userList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  // const borrarUsuario = async () => {
  //   try {
  //     const usuarioRef = doc(firebase.db, 'usuarios', id);
  //     await deleteDoc(usuarioRef);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDeleteUser = async (userId) => {
    try {
        await deleteDoc(doc(firestore, 'usuarios', userId));
        setUsers(users.filter(user => user.id !== userId));
        console.log('Usuario eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
};

return (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
    <ul>
      {users.map(user => (
        <li key={user.id} className="flex items-center justify-between mb-2 bg-white rounded-lg p-4 shadow-sm">
          <div>
            <p className="text-lg">
              <span className="font-bold">Nombre:</span> {user.nombre}
            </p>
            <p className="text-sm">
              <span className="font-bold">Correo:</span> {user.correo}
            </p>
            <p className="text-sm">
              <span className="font-bold">Rol:</span> {user.rol}
            </p>
          </div>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none"
            onClick={() => handleDeleteUser(user.id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default Usuarios;