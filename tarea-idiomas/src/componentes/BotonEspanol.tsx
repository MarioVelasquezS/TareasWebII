'use client'
import React from 'react';

export default function BotonEspanol({ cambiarAEspanol }: { cambiarAEspanol: () => void }) {
  return (
    <button onClick={cambiarAEspanol}>
      Cambiar Idioma Español
    </button>
  );
}