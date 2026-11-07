'use client'
import React, { createContext, useContext, useState } from 'react'

interface TriviaContextType {
  puntajeAcumulado: number;
  preguntasRespondidas: number;
  incrementarPuntaje: (puntos: number) => void;
  incrementarRespondidas: () => void;
  reiniciarJuego: () => void;
}

const TriviaContext = createContext<TriviaContextType>({
  puntajeAcumulado: 0,
  preguntasRespondidas: 0,
  incrementarPuntaje: () => { },
  incrementarRespondidas: () => { },
  reiniciarJuego: () => { },
})

export function TriviaProvider({ children }: { children: React.ReactNode }) {
  const [puntajeAcumulado, setPuntajeAcumulado] = useState<number>(0)
  const [preguntasRespondidas, setPreguntasRespondidas] = useState<number>(0)

  const incrementarPuntaje = (puntos: number) => {
    setPuntajeAcumulado((anterior) => anterior + puntos)
  }

  const incrementarRespondidas = () => {
    setPreguntasRespondidas((anterior) => anterior + 1)
  }

  const reiniciarJuego = () => {
    setPuntajeAcumulado(0)
    setPreguntasRespondidas(0)
  }

  return (
    <TriviaContext.Provider
      value={{ puntajeAcumulado, preguntasRespondidas, incrementarPuntaje, incrementarRespondidas, reiniciarJuego }}
    >
      {children}
    </TriviaContext.Provider>
  )
}

export const useTrivia = () => useContext(TriviaContext)

