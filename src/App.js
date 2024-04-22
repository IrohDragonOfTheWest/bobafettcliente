import React from 'react'
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import Ordenes from './components/paginas/Ordenes';
import Inventario from './components/paginas/Inventario';
import Sidebar from './components/ui/Sidebar';
import Home from './components/paginas/Home';
import Login from './components/paginas/Login';

import firebase, { FirebaseContext } from './firebase';
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nueva-bebida" element={<NuevaBebida />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/usuarios" element={<Usuarios/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>

  )
}

export default App