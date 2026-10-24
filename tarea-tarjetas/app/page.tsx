'use client'
import React, { useState, useEffect } from 'react';
import Tarjeta from '../componentes/Tarjeta';
import { Persona } from '../modelos/Persona';

export default function Home() {
  const [listaPersonas, setListaPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    const datosIniciales: Persona[] = [
      { id: 1, nombre: "Ana López", ocupacion: "Ingeniera de Software", pais: "Honduras" },
      { id: 2, nombre: "Carlos Gómez", ocupacion: "Diseñador Gráfico", pais: "México" },
      { id: 3, nombre: "María Silva", ocupacion: "Médico Cirujano", pais: "Colombia" },
      { id: 4, nombre: "Juan Pérez", ocupacion: "Arquitecto", pais: "España" },
      { id: 5, nombre: "Laura Torres", ocupacion: "Profesora", pais: "Argentina" }
    ];
    setListaPersonas(datosIniciales);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Lista de Profesionales</h1>
      
      <div className="flex flex-wrap justify-center max-w-5xl">
        {listaPersonas.map((persona) => (
          <Tarjeta 
            key={persona.id} 
            id={persona.id}
            nombre={persona.nombre}
            ocupacion={persona.ocupacion}
            pais={persona.pais}
          />
        ))}
      </div>
    </div>
  );
}