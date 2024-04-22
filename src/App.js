import React from 'react'
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import Ordenes from './components/paginas/Ordenes';
import Inventario from './components/paginas/Inventario';
import Sidebar from './components/ui/Sidebar';
import Home from './components/paginas/Home';
import Login from './components/paginas/Login';
import Footer from './components/ui/Footer';

import Carrito from './components/paginas/Carrito'
import ConfirmarCarrito from './components/paginas/ConfirmarCarrito'

import { FirebaseContext } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from './firebase/firebase';

import Usuarios from './components/paginas/Usuarios';

function App() {
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
        <Carrito/>

          <Routes>
          

            <Route path="/" element={<Home />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nueva-bebida" element={<NuevaBebida />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/usuarios" element={<Usuarios/>}/>
            <Route path="/login" element={<Login/>}/>

            <Route path="/carrito" element={<Carrito/>}/>
            <Route path="/confirmar" element={<ConfirmarCarrito/>}/>

          </Routes>
        </div>
      </div>
      <Footer/>
    </FirebaseContext.Provider>

  )
}

export default App