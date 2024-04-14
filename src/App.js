import React from 'react'
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import Ordenes from './components/paginas/Ordenes';
import Inventario from './components/paginas/Inventario';
import Usuarios from './components/paginas/Usuarios';
import Sidebar from './components/ui/Sidebar';

function App() {

  const appStyle = {
    backgroundColor: '#DFE0DF'
  };

  return (
    <div style={appStyle}>
      <div className="md: flex min-h-screen">
        <Sidebar />
        <div className="md: w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nueva-bebida" element={<NuevaBebida />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App