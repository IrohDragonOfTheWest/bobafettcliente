import React, { useContext, useRef, useState} from 'react';
import { FirebaseContext } from '../../firebase/index';
import Venta from './Sidebar';
import { Store } from '../utils/Store';
// import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';


const MostrarBebida = ({ mostrarbebida }) => {
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const { firebase } = useContext(FirebaseContext);
  const existenciaRef = useRef(mostrarbebida.existencia);
  const { id, nombre, imagen, precio, ingredientes, preparacion, existencia } = mostrarbebida;

  const addToCart = (id) => {
    const existItemIndex = state.cart.cartItems.findIndex(x => x.id === id);
    if (existItemIndex !== -1) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...mostrarbebida, id, quantity: 1 } });
    }
  };

  const actualizarDisponibilidad = async () => {
    const existencia = (existenciaRef.current.value === "true");
    try {
      const bebidaRef = doc(firebase.db, 'bebidas', id);
      await updateDoc(bebidaRef, { existencia });
    } catch (error) {
      console.log(error);
    }
  };

  const borrarBebida = async () => {
    try {
      const bebidaRef = doc(firebase.db, 'bebidas', id);
      await deleteDoc(bebidaRef);
    } catch (error) {
      console.log(error);
    }
  };
  const nuevoNombreRef = useRef(null);
  const nuevosIngredientesRef = useRef(null);
  const nuevaPreparacionRef = useRef(null);
  const nuevaExistenciaRef = useRef(null);

  const [editando, setEditando] = useState(false);

  const toggleEdicion = () => {
    setEditando(!editando);
  };

  const actualizarBebida = async () => {
    const nuevoNombre = nuevoNombreRef.current.value;
    const nuevosIngredientes = nuevosIngredientesRef.current.value;
    const nuevaPreparacion = nuevaPreparacionRef.current.value;
    const nuevaExistencia = nuevaExistenciaRef.current.checked;

    try {
      const bebidaRef = doc(firebase.db, 'bebidas', id);
      await updateDoc(bebidaRef, {
        nombre: nuevoNombre,
        ingredientes: nuevosIngredientes,
        preparacion: nuevaPreparacion,
        existencia: nuevaExistencia
      });
      alert('Bebida actualizada exitosamente');
    } catch (error) {
      console.log(error);
      alert('Hubo un error al actualizar la bebida');
    }
  };
  return (
    <div className='w-full px-3 mb-4'>
      <div className="p-5 shadow-md" style={{ backgroundColor: "#F0CE71" }}>
        <div className='lg:flex'>
          <div className='lg:w-5/12'>
            <img src={imagen} alt="imagen platillo" />
            <div className='sm:flex sm:mx-2'>
              <label className='block mt-5 sm:w-2/4'>
                <span className='block text-gray-800 mb-2'>Existencias  </span>
                <select
                  className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-online'
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarDisponibilidad()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className='lg:w7/12 xl:w-9/12 pl-5'>
            <p className='font-bold text-2xl text-yellow-600 mb-4'>{nombre}</p>
            <p className='text-gray-600 mb-4'>Precio: {' '}
              <span className='text-gray-700 font-bold'>$ {precio}</span>
            </p>
            <p className='text-gray.600 mb-4'>Ingredientes {' '}
              <span className='text-gray-700 font-bold'>: {ingredientes}</span>
            </p>
            <p className='text-gray.600 mb-4'>Preparacion {' '}
              <span className='text-gray-700 font-bold'>: {preparacion}</span>
            </p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"  onClick={toggleEdicion}>Actualizar Bebida </button>

            {editando && (
  <div className="p-5 shadow-md" style={{ backgroundColor: "#90FA92", borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
    <h2 className="text-xl font-bold mb-3">Editar Bebida</h2>
    <div className="flex flex-col mb-3">
      <label className="mb-1">Nombre:</label>
      <input type="text" ref={nuevoNombreRef} defaultValue={nombre} className="border rounded px-3 py-2 w-full" />
    </div>
    <div className="flex flex-col mb-3">
      <label className="mb-1">Ingredientes:</label>
      <textarea ref={nuevosIngredientesRef} defaultValue={ingredientes} className="border rounded px-3 py-2 w-full" />
    </div>
    <div className="flex flex-col mb-3">
      <label className="mb-1">Preparación:</label>
      <textarea ref={nuevaPreparacionRef} defaultValue={preparacion} className="border rounded px-3 py-2 w-full" />
    </div>
   
    <button onClick={actualizarBebida} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Cambios</button>
  </div>
)}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={() => addToCart(id)}>Agregar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => borrarBebida()}>Borrar</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MostrarBebida;
