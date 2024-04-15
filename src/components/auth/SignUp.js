import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../firebase/firebase';



const SignUp =  () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>Crear una cuenta</h1>
                <input
                    type="email"
                    placeholder='Ingrese su correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Registrarse</button>
            </form>            
        </div>
    )
}

export default SignUp