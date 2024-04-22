import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { NavLink } from "react-router-dom";
import '../../css/styles.css';

import { signOut } from "firebase/auth";

import firebase from "../../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Login from "../paginas/Login";
//13-42
const auth = firebase.auth;
const firestore = getFirestore(firebase.firestore);

const Sidebar = () => {
    

    const [user, setUser] = useState(null);

    useEffect((user) => {
        const unsubscribe = auth.onAuthStateChanged(async (usuarioFirebase) => {
            if (usuarioFirebase) {
                const rol = await getRol(usuarioFirebase.uid);
                const userData = {
                    uid: usuarioFirebase.uid,
                    email: usuarioFirebase.email,
                    rol: rol,
                };
                setUser(userData);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    async function getRol(uid) {
        const docuRef = doc(firestore, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        return docuCifrada.exists() ? docuCifrada.data().rol : null;
    }

    const barStyle = {
        backgroundColor: '#624100'
    };

    return (
        <div className="w-full" style={barStyle}>

            <div className="flex flex-col items-center justify-center p-6">

                <p className="uppercase text-white text-2xl tracking-wide font-bold mb-4">
                    Boba Fest
                </p>
                <nav className="flex flex-wrap items-center justify-center space-x-4">
                    <NavLink className="text-gray-400 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/">
                        Inicio
                    </NavLink>

                    {user && user.rol === "admin" && (
                        <NavLink className="text-gray-400 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/ordenes">
                            Ordenes
                        </NavLink>
                    )}

                    <NavLink className="text-gray-400 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/menu">
                        Menu
                    </NavLink>

                    

                    {user && user.rol === "admin" && (
                        <NavLink className="text-gray-400 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/usuarios">
                            Usuarios
                        </NavLink>
                    )}

                    <NavLink className="text-gray-400 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/login">
                        {user != null ? <button onClick={() => signOut(auth)}>Cerrar sesión</button> : "Iniciar sesión"}
                    </NavLink>
                    
                    
                </nav>
            </div>
        </div>






    );
}

export default Sidebar;
