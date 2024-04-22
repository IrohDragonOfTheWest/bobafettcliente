import React, {useContext, useRef,useState}from 'react';
import { FirebaseContext } from '../../firebase/index';
import { Store } from '../utils/Store';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';

const Carrito = (mostrarbebida) => {
    

    const [cartOpen, setCartOpen] = useState(false); // Estado para controlar si el carrito está abierto o cerrado

    const toggleCart = () => {
      setCartOpen(!cartOpen);
    };
    //Existencia re para acceder al valor directamente
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
    console.log('ID del elemento a eliminar:', id);
    dispatch({ type: 'CART_REMOVE_ITEM', payload: { id } });
};

  
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
    
<div className="fixed top-0 right-0 h-full bg-black bg-opacity-50 w-0 transition-all overflow-hidden z-50" style={{ width: cartOpen ? '400px' : '0px' }}>
        
        <div className="bg-white h-full w-full max-w-xs p-5 overflow-y-auto">
        <button 
  className=" right-2 text-red-600 hover:text-red-800 focus:outline-none"
  onClick={toggleCart}
>X</button>
          
          <h2 className="text-2xl font-bold mb-4">Carrito de Compra</h2>
          

          {cartItems.map((item) => (
            <div key={item.id}>
              <p>
                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => delToCart(item.id)}>
                  x
                </button>
                <strong>{item.nombre}</strong>
              </p>
              <p>
                Cantidad:
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => addToCart(item.id)}>+</button>
                {item.quantity}
                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => removeFromCart(item.id)}>-</button>
              </p>
            </div>
          ))}
          <p>Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : ${cartItems.reduce((a, c) => a + c.quantity * c.precio, 0)}</p>
          {cartItems.length ?  <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/confirmar">  Ver Carrito </NavLink>
                    : <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Ver carrito</button>}
        </div>
      <button className="fixed top-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleCart}>Carrito</button>
    </div>
  );
};

  export default Carrito;

