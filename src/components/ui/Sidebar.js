import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/styles.css';
import { signOut } from "firebase/auth";
import firebase from "../../firebase/firebase";

const auth = firebase.auth;

const Sidebar = () => {

    const barStyle = {
        backgroundColor: '#624100'
    };

    return (
        <div className="w-full" style={barStyle}>
            
            <div className="flex flex-col items-center justify-center p-6">
                
                <p className="uppercase text-white text-2xl tracking-wide font-bold mb-4">
                    BobaFett App
                </p>
                <nav className="flex flex-wrap items-center justify-center space-x-4">
                    <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/">
                        Ordenes
                    </NavLink>
                    <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/menu">
                        Menu
                    </NavLink>
                    <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/inventario">
                        Inventario
                    </NavLink>
                    <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/usuarios">
                        Usuarios
                    </NavLink>
                    <NavLink className="text-gray-400 hover:text-gray-900" activeClassName="text-yellow-500" exact={true} to="/login">
                        Login
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
