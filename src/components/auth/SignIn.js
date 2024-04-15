import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../firebase/firebase';



const SignIn =  () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebase.auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Ingresar a su cuenta</h1>
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
                <button type="submit">Ingresar</button>
            </form>            
        </div>
    )
}

export default SignIn