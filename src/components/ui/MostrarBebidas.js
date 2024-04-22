import React, {useContext, useRef, useState}from 'react';
import { FirebaseContext } from '../../firebase/index';
import Venta from './Sidebar'
import { Store } from '../utils/Store';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const MostrarBebida = ({mostrarbebida}) => {
  
  //Existencia re para acceder al valor directamente
  const [cartOpen, setCartOpen] = useState(false); 

    const toggleCart = () => {
      setCartOpen(!cartOpen);
    };

const {state, dispatch}= useContext(Store)
const {cart:{cartItems}} = state


const addToCart = (id) => {
  const existItemIndex = state.cart.cartItems.findIndex(x => x.id === id);

  if (existItemIndex !== -1) {
    // Si el producto ya está en el carrito, incrementa su cantidad en 1
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
    dispatch({ type: 'ADD_TO_CART', payload: { ...mostrarbebida, id, quantity: 1 } });
  }
}

const delToCart = (id) => {
dispatch({type: 'CART_REMOVE_ITEM', payload: id })
}
  
  
  const existenciaRef = useRef(mostrarbebida.existencia);

  const {firebase } = useContext(FirebaseContext);
  

  const {id, nombre,imagen , precio, ingredientes,preparacion,existencia } = mostrarbebida;


    //context de firebase para cmabios en la bd
  

      //modificas el estado del platillo en firebase
  const actualizarDisponibilidad = () =>{
    const existencia =(existenciaRef.current.value ==="true");
    try{
      firebase.db.collection('bebidas')
      .doc(id)
      .update({
        existencia
      });
    }catch(error){
      console.log(error);
    }
  }


  const removeFromCart = (id) => {
    // Encuentra el elemento en el carrito
    const cartItem = cartItems.find(item => item.id === id);
    // Si el elemento existe y su cantidad es mayor que 1, reduce la cantidad
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } });
    } else {
      // Si la cantidad es 1 o el elemento no existe, elimina el elemento del carrito
      dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
    }
  };
  

  const saveInfo = async () => {
    
      // Asegúrate de que db esté definido y referenciado correctamente
      const db = getFirestore();
      // Asegúrate de que arreglo y subtotal estén definidos
      const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.precio, 0);
      const arreglo = cartItems;
  
      // Guarda la venta en la colección 'ventas'
      await addDoc(collection(db, 'ventas'), { arreglo, subtotal });
      console.log('Venta guardada con éxito');
      // Limpia el carrito después de guardar la venta
      dispatch({type: 'REMOVE_CART'});
      alert('Venta guardada con éxito');
  
  };
  
  


  

  return (
    <div className='w-full px-3 mb-4'>
      <div className="p-5 shadow-md" style={{ backgroundColor: "#F0CE71" }}>
        <div className='lg:flex'>
          <div className='lg:w-5/12'>
            <img src={mostrarbebida.imagen} alt="imagen platillo"/>
            <div className='sm:flex sm:mx-2'>
              <label className='block mt-5 sm:w-2/4'> 
                <span className='block text-gray-800 mb-2'>Existencias  </span>
                <select className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-online'
                  value={mostrarbebida.existencia}
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
            <p className='font-bold text-2xl text-yellow-600 mb-4'>{mostrarbebida.nombre}</p>
            <p className='text-gray-600 mb-4'>Precio: {''}
              <span className='text-gray-700 font-bold'>{mostrarbebida.precio}</span>
            </p>
            <p className='text-gray.600 mb-4'>Ingredientes {''}
              <span className='text-gray-700 font-bold'>: {mostrarbebida.ingredientes}</span>
            </p>
            <p className='text-gray.600 mb-4'>Preparacion {''}
              <span className='text-gray-700 font-bold'>: {mostrarbebida.preparacion}</span>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(mostrarbebida.id)}>Agregar</button>
          </div>
        </div>
      </div>
      
      </div>
  );
};

export default MostrarBebida;
