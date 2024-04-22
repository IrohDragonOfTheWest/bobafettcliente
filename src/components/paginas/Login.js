import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

const auth = firebase.auth;
const firestore = getFirestore(firebase.firestore);

function Login() {

    const [isRegistrando, setIsRegistrando] = useState(false);
    const [isAdminRegistered, setIsAdminRegistered] = useState(false);

    // Check if admin is already registered
    useEffect(() => {
        const checkAdmin = async () => {
            const usersRef = collection(firestore, 'usuarios');
            const q = query(usersRef, where("rol", "==", "admin"));
            const querySnapshot = await getDocs(q);
            setIsAdminRegistered(!querySnapshot.empty);
        };

        checkAdmin();
    }, []);

    async function registrarUsuario(email, password, rol) {
        const infoUsuario = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        ).then((usuarioFirebase) => {
            return usuarioFirebase;
        });

        console.log(infoUsuario.user.uid);

        const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);

        setDoc(docuRef, { correo: email, rol: rol });
    }

    function submitHandler(e) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value;

        console.log("submit", email, password, rol)

        if (isRegistrando) {
            //registrar
            registrarUsuario(email, password, rol).then(() => {
                // Clear the form after registration
                e.target.reset();
            });
        } else {
            //login
            signInWithEmailAndPassword(auth, email, password).then(() => {
                // Clear the form after login
                e.target.reset();

            });
        }
    }


    return (
        <div className="bg-white min-200 flex justify-center items-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md space-y-6">
                <h1 className="text-5xl font-bold mb-6">
                    {isRegistrando ? "Regístrate" : "Inicia sesión"}
                </h1>

                <form className="space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="email" className="block font-medium text-2xl">Correo electrónico:</label>
                        <input type="email" id="email" placeholder="Ingrese su correo" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium text-2xl">Contraseña:</label>
                        <input type="password" id="password" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4" />
                    </div>


                    {isAdminRegistered && (
                        <div style={{ display: isAdminRegistered ? 'none' : 'block' }} >
                            <label htmlFor="role" className="block font-medium text-2xl">Rol:</label>
                            <select id="rol" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4" disabled>
                                <option value="user">Usuario</option>
                            </select>
                        </div>
                    )}

                    {!isAdminRegistered && (
                        <div >
                            <label htmlFor="role" className="block font-medium text-2xl">Rol:</label>
                            <select id="rol" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4">
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-xl font-semibold">
                        {isRegistrando ? "Registrar" : "Iniciar sesión"}
                    </button>
                </form>

                <button onClick={() => setIsRegistrando(!isRegistrando)} className="text-blue-500 mt-6 hover:underline text-2xl font-semibold">
                    {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
                </button>
            </div>
        </div>
    )
}

export default Login;
