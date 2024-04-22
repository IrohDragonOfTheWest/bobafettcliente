import React, {useContext, useRef}from 'react';
import { FirebaseContext } from '../../firebase/index';
import Venta from '../ui/Sidebar'
import { Store } from '../utils/Store';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const ConfirmarCarrito = ({mostrarbebida}) => {
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
dispatch({type: 'CART_REMOVE_ITEM', payload: id })
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
  
  


  

return(

     
    
      <div className='card card-body mt-5'>
        <h3 className='text-center'>Orden Compra</h3>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>
            <button
  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => delToCart(item)}
>
  x
</button>

              <strong>{item.nombre}</strong>
            </p>
            <p>
              Cantidad:
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => addToCart(item.id)}
              >
                +
              </button>
                {item.quantity}
                <button
    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
    onClick={() => removeFromCart(item.id)} // Aquí pasas el ID correctamente
  >
    -
  </button>
</p>
          </div>
        ))}
    
         Subtotal: ({cartItems.reduce((a, c)=> a + c.quantity, 0)}) : $
         {cartItems.reduce((a,c)=>a + c.quantity * c.precio, 0)}
         {cartItems.length ? <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveInfo}> Guardar venta </button > :  <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Guardar Venta</button>}





         </div>



);}
export default ConfirmarCarrito
