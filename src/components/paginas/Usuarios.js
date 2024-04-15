import React from "react";
import SignIn from '../auth/SignIn'
import SignUp from "../auth/SignUp";
import AuthDetails from '../auth/AuthDetails' 

const Usuarios = () => {
    return (
        <>
            <h1 className="text-3xl font-light mb-4">
                Logins
            </h1>
            <div>
                <SignIn/>
            </div>
            <div>
                <SignUp/>
            </div>
            <div>
                <AuthDetails/>
            </div>
        </>
    )
}

export default Usuarios;