import React, {useContext, useRef}from 'react';
import { FirebaseContext } from '../../firebase';

const MostrarBebida = ({mostrarbebida}) => {
  //Existencia re para acceder al valor directamente

  
  
  const existenciaRef = useRef(mostrarbebida.existencia);

  const {firebase }=useContext(FirebaseContext);

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
return(
 <div className='w-full px-3 mb-4'>
    <div className="p-5 shadow-md" style={{ backgroundColor: "#F0CE71" }}>
    <div className='lg:flex'>
        <div className='lg:w-5/12'>
         <img src={imagen} alt="imagen platillo"/>
         <div className='sm:flex sm:mx-2'>
            <label className='block mt-5 sm:w-2/4'> 
              <span className='block text-gray-800 mb-2'>Existencias  </span>
                <select className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-online'
                 value={existencia}
                 ref={existenciaRef}
                 onChange={()=>actualizarDisponibilidad()}
                > 
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
             
            </label>
         </div>
        </div>
        <div className='lg:w7/12 xl:w-9/12 pl-5'>
         <p className='font-bold text-2xl text-yellow-600 mb-4'>{nombre}</p>
         <p className='text-gray-600 mb-4'>Precio: {''}
         <span className='text-gray-700 font-bold'>{precio}</span>
         </p>
         
         <p className='text-gray.600 mb-4'>Ingredientes {''}
         <span className='text-gray-700 font-bold'>: {ingredientes}</span>
         </p>
         <p className='text-gray.600 mb-4'>Preparacion {''}
         <span className='text-gray-700 font-bold'>: {preparacion}</span>
         
         </p>
        </div>
     </div>
    </div>
  </div>
        
     


);}
export default MostrarBebida