'use client'
import React, { createContext } from 'react';


export const palabrasJSON = [
  { es: "Casa", en: "House" },
  { es: "Perro", en: "Dog" },
  { es: "Comida", en: "Food" },
  { es: "Escuela", en: "School" },
  { es: "Libro", en: "Book" },
  { es: "Agua", en: "Water" },
  { es: "Gato", en: "Cat" },
  { es: "Coche", en: "Car" },
  { es: "Mesa", en: "Table" },
  { es: "Sol", en: "Sun" }
];


export const DiccionarioContext = createContext(palabrasJSON);


export default function DiccionarioProvider({ children }: { children: React.ReactNode }) {
  return (
    <DiccionarioContext.Provider value={palabrasJSON}>
      {children}
    </DiccionarioContext.Provider>
  );
}