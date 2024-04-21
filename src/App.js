import React, { useState } from 'react'
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import Ordenes from './components/paginas/Ordenes';
import Inventario from './components/paginas/Inventario';
import Sidebar from './components/ui/Sidebar';
import Home from './components/paginas/Home';

import firebase,{FirebaseContext} from './firebase';

import AdminView from './components/paginas/AdminView';


function App() {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

//const [user, setUser] = useState(null);

  const appStyle = {
    backgroundColor: '#DFE0DF'
  };

  return ( 
    <FirebaseContext.Provider
    value={{
      firebase
    }}> 
    {/* {user ? <AdminView/> : <Home/>} */}
    <div style={appStyle}>
    <button onClick={toggleSidebar}>btnside</button>
      <div className="md: flex min-h-screen">
        <Sidebar isOpen={isSideBarOpen}/>
        <div className="md: w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nueva-bebida" element={<NuevaBebida />} />
            <Route path="/inventario" element={<Inventario />} />
            
          </Routes>
        </div>
      </div>
    </div>
    </FirebaseContext.Provider>

  )
}

export default App