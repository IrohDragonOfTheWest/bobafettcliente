import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return(
        <>
        <h1 className="text-3xl font-light mb-4">
            Menu
        </h1>
        <Link to="/nueva-bebida" className="bg-yellow-900 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
            Agregar bebida
        </Link>
        </>
    )
}

export default Menu;