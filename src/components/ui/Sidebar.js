import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/styles.css';
import logo from '../imagenes/logo.jpeg'

const Sidebar = ({ isOpen }) => {

    const barStyle = {
        backgroundColor: '#624100',
        width: isOpen ? '20rem' : '0',
        transition: 'width 0.5s ease'
    };

    return (

        <div className="md: w-2/5 xl:w-1/5" style={barStyle}>
            {isOpen && (
                <div className="p-6">
                    <p className="uppercase text-white text-2xl tracking-wide text-center font bold">
                        BobaFett App
                    </p>
                    <div className="logo-container">
                        <img className="logo " src={logo} alt="logo" />
                    </div>

                    <p className="mt-3 text-gray-500">
                        Administar tu negocio en las siguientes opciones
                    </p>
                    <nav>

                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/">
                            Inicio
                        </NavLink>

                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/ordenes">
                            Ordenes
                        </NavLink>

                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/menu">
                            Menu
                        </NavLink>

                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/inventario">
                            Inventario
                        </NavLink>

                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeclassname="text-yellow-500" exact="true" to="/login">
                            Login
                        </NavLink>
                    </nav>
                </div>
            )}
        </div>

    );
}

export default Sidebar;