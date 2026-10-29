'use client'
import React from 'react';

export default function BotonIngles({ cambiarAIngles }: { cambiarAIngles: () => void }) {
  return (
    <button onClick={cambiarAIngles}>
      Cambiar Idioma Ingles
    </button>
  );
}

