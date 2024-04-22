import React, { useContext, useState } from 'react'
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import Ordenes from './components/paginas/Ordenes';
import Inventario from './components/paginas/Inventario';
import Sidebar from './components/ui/Sidebar';
import Home from './components/paginas/Home';
import Login from './components/paginas/Login';

import { FirebaseContext } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from './firebase/firebase';

const auth = firebase.auth;
function App() {

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  const appStyle = {
    backgroundColor: '#DFE0DF'
  };

  return (
    <FirebaseContext.Provider
    value={{
      firebase
    }}> 
  
    <div style={appStyle}>
        <div className="w-full">
        <Sidebar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nueva-bebida" element={<NuevaBebida />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/login" element={<Login/>}/>
            {/* {!user && <Route path="/login" element={<Login/>}/>} */}
          </Routes>

        </div>
      </div>
    </FirebaseContext.Provider>

  )
}

export default App