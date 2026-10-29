'use client'
import React, { useState, useEffect, useContext } from 'react';
import DiccionarioProvider, { DiccionarioContext } from '../contexto/DiccionarioContext';
import BotonEspanol from '../componentes/BotonEspanol';
import BotonIngles from '../componentes/BotonIngles';


function AplicacionDiccionario() {
  
  const palabrasGlobales = useContext(DiccionarioContext);
  
  
  const [idiomaActual, setIdiomaActual] = useState('es');
  
  
  const [listaMostrada, setListaMostrada] = useState<string[]>([]);

 
  useEffect(() => {
    
    const nuevaLista = palabrasGlobales.map(item => idiomaActual === 'es' ? item.es : item.en);
    setListaMostrada(nuevaLista);
  }, [idiomaActual, palabrasGlobales]); // El useEffect "escucha" cuando cambia el idiomaActual

  return (
    <div>
      <h1>Diccionario Bilingüe</h1>
      
      {}
      <BotonEspanol cambiarAEspanol={() => setIdiomaActual('es')} />
      {' '}
      <BotonIngles cambiarAIngles={() => setIdiomaActual('en')} />

      <br /><br />
      
      {}
      <table border={1}>
        <thead>
          <tr>
            <th>Palabras ({idiomaActual === 'es' ? 'Español' : 'Inglés'})</th>
          </tr>
        </thead>
        <tbody>
          {listaMostrada.map((palabra, index) => (
            <tr key={index}>
              <td>{palabra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function Home() {
  return (
    <DiccionarioProvider>
      <AplicacionDiccionario />
    </DiccionarioProvider>
  );
}