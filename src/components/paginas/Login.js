import React, { useState } from 'react';

function Login() {
    const [isRegistrando, setIsRegistrando] = useState(false);

    return (
        <div className="bg-white min-200 flex justify-center items-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md space-y-6">
                <h1 className="text-5xl font-bold mb-6">
                    {isRegistrando ? "Regístrate" : "Inicia sesión"}
                </h1>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block font-medium text-2xl">Correo electrónico:</label>
                        <input type="email" id="email" placeholder="Ingrese su correo" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium text-2xl">Contraseña:</label>
                        <input type="password" id="password" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4" />
                    </div>

                    {!isRegistrando && (
                        <div>
                            <label htmlFor="role" className="block font-medium text-2xl">Rol:</label>
                            <select id="role" className="block w-full rounded-lg border-gray-300 mt-1 text-xl py-3 px-4">
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
    );
}

export default Login;
