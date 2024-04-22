import { useReducer, createContext } from "react"; 

export const Store = createContext();
const initialState={
    cart : {
        cartItems:[],
    }
}
// /funcion reductora donde se crea la logica funcional 
function reducer(state, action){
        switch (action.type) {
            case 'ADD_TO_CART': {
                const newItem = action.payload;
                const existItemIndex = state.cart.cartItems.findIndex(item => item.id === newItem.id);
              
                if (existItemIndex !== -1) {
                  // Si el artículo ya está en el carrito, incrementa su cantidad
                  const updatedCartItems = [...state.cart.cartItems];
                  updatedCartItems[existItemIndex].quantity += newItem.quantity;
                  return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
                } else {
                  // Si el artículo no está en el carrito, agrégalo
                  return { ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, newItem] } };
                }
              }
              
              case 'CART_REMOVE_ITEM': {
                const itemIdToRemove = action.payload.id;
                console.log('ID del elemento a eliminar:', itemIdToRemove);
            
                const cartItems = state.cart.cartItems.filter(item => item.id !== itemIdToRemove);
                console.log('Nuevo arreglo de elementos del carrito:', cartItems);
            
                return { ...state, cart: { ...state.cart, cartItems } };
            }
            
case 'REMOVE_CART':{
    const cartItems = []
    return {...state, cart:{...state.cart,cartItems} }
}
case 'INCREMENT_QUANTITY': {
    const { id } = action.payload;
    const cartItems = state.cart.cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return { ...state, cart: { ...state.cart, cartItems } };
  }
  case 'DECREMENT_QUANTITY': {
    const { id } = action.payload;
    const updatedCartItems = state.cart.cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
  }
  
default:
    return state;
}
}

export function StoreProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}