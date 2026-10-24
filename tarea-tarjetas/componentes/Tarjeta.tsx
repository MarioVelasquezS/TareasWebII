import React from 'react';
import { Persona } from '../modelos/Persona';

export default function Tarjeta(props: Persona) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white w-64 m-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{props.nombre}</h2>
      <p className="text-gray-600"><b>Ocupación:</b> {props.ocupacion}</p>
      <p className="text-gray-600"><b>País:</b> {props.pais}</p>
    </div>
  );
}