import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { FirebaseContext } from '../../firebase';
// import NuevoTaller from "./NuevoTaller";
// import MostrarTaller from "../ui/MostrarTaller";
import MostrarBebida from "../ui/MostrarBebidas";
const Menu = () => {

    const [mostrarbebidas, guardarBebidas] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerBebidas = () => {
            firebase.db.collection('bebidas').onSnapshot(manejarSnapshot);
        }

        obtenerBebidas();
    }, []);

    function manejarSnapshot(snapshot) {
        const mostrarbebidas = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarBebidas(mostrarbebidas);
    }

    return (
        <div className="taller-container" style={{ backgroundColor: "#71F0A8" }}>
            <h1 className="text-5xl font.light mb-4 text-center">Bebida</h1>
            <div className="text-center">
             <Link to="/nueva-bebida" className="bg-orange-300 hover:bg-red-700 inline-block mb-5 p-2 text-white uppercase font-bold">Agregar bebida</Link>
            </div>

            {mostrarbebidas.map(mostrarbebida => (
                <MostrarBebida
                    key={mostrarbebida.id}
                    mostrarbebida={mostrarbebida}
                />
            ))}
        </div>
    );
}


//     return(
//         <>
//         <h1 className="text-3xl font-light mb-4">
//             Menu
//         </h1>
//         <Link to="/nueva-bebida" className="bg-yellow-900 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
//             Agregar bebida
//         </Link>
//         </>
//     )
// }

export default Menu;