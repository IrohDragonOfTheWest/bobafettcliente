import React, { useState } from 'react'

function Login() {

    const [isRegistrando, setIsRegistrando] = useState(false);
    return (
        <div>
            <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

            <form>
                <label>
                    Correo electrónico:
                    <input type="email" id="email" placeholder="Ingrese su correo" />
                </label>

                <label>
                    Contraseña:
                    <input type="password" id="password" />
                </label>

                <label>
                    Rol:
                    <select>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </label>

                <input
                type="submit" 
                value={isRegistrando ? "Registrar" : "Iniciar sesión"}
                />
            </form>

            <button onClick={() => setIsRegistrando(!isRegistrando)} className="text-blue-500 underline text-sm">
                {isRegistrando ? "Ya tengo una cuenta" : "Quiero registarme"}
            </button>
        </div>
    )
}

export default Login
