import React, { useEffect, useState } from 'react'
import firebase from '../../firebase/firebase'; //para la autenticacion
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(firebase.auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(firebase.auth). then(() => {
            console.log('Salio con exito')
        }).catch(error => console.log(error));
    }

    return <div>{authUser ? <><p>{`Ingresado como ${authUser.email}`}</p> <button onClick={userSignOut}>Salir</button></> : <p>Egresado</p>}</div>
};

export default AuthDetails