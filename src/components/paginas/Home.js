import React from 'react';
import logo from '../imagenes/logo.jpeg';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-24 w-24" />
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">¡Bienvenido a nuestra tienda de Té de Burbujas!</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl mb-8 text-center">El té de burbujas, también conocido como boba, es una bebida deliciosa y refrescante que se originó en Taiwán en la década de 1980. Consiste en té infusionado con leche o jugo, combinado con perlas de tapioca que le dan un toque único y divertido.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">¿Por qué consumir té de burbujas?</h2>
          <ul className="list-disc pl-4 mb-8">
            <li className="text-lg mb-2">Es una bebida refrescante y deliciosa, perfecta para cualquier momento del día.</li>
            <li className="text-lg mb-2">Las perlas de tapioca añaden una textura divertida y satisfactoria a la bebida.</li>
            <li className="text-lg mb-2">Existen una amplia variedad de sabores y combinaciones para satisfacer todos los gustos.</li>
            <li className="text-lg mb-2">El té de burbujas se ha convertido en una tendencia global, por lo que es fácil encontrarlo en muchas ciudades de todo el mundo.</li>
          </ul>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-4">Encuentra nuestra tienda más cercana</h2>
          <p className="text-lg mb-4">Visita una de nuestras sucursales para disfrutar de una amplia selección de té de burbujas. ¡Encuentra tu sabor favorito y descubre por qué el té de burbujas es tan popular en todo el mundo!</p>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
