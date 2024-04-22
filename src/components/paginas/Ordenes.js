import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase/index';
import { Store } from '../utils/Store';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';

const Ordenes = () => {
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const [ventas, setVentas] = useState([]);
  const db = getFirestore();

  // Función para cargar las ventas
  const cargarVentas = async () => {
    try {
      const ventasSnapshot = await getDocs(collection(db, 'ventas'));
      const ventasData = ventasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Datos de ventas:', ventasData);
      setVentas(ventasData);
    } catch (error) {
      console.error('Error al cargar las ventas:', error);
    }
  };

  // Función para eliminar una venta
  const eliminarVenta = async (id) => {
    try {
      await deleteDoc(doc(db, 'ventas', id));
      console.log('Venta eliminada con éxito');
      cargarVentas(); // Actualizar la lista de ventas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };
  
  useEffect(() => {
    cargarVentas();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ventas Realizadas</h2>
      {ventas.length > 0 ? (
        ventas.map((venta, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Venta #{index + 1}</h3>
            <p><strong>Subtotal:</strong> ${venta.subtotal}</p>
            <div className="mt-2">
              {venta.arreglo.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.nombre}</span>
                  <span className="text-gray-700">Cantidad: {item.quantity}</span>
                </div>
              ))}
            </div>
            <button onClick={() => eliminarVenta(venta.id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">Eliminar Venta</button>
          </div>
        ))
      ) : (
        <div className="text-gray-700">No hay ventas realizadas</div>
      )}
    </div>
  )
};

export default Ordenes;
