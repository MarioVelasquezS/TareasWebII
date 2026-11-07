'use client'
import React from 'react'
import { useTrivia } from '../context/TriviaContext'

export const Header = () => {
  const { puntajeAcumulado, preguntasRespondidas } = useTrivia()

  return (
    <nav className="navbar bg-white border-0">
      <div className="container">
        <span className="navbar-brand mb-0 h1 text-dark">Trivia Verdadero o Falso</span>
        <div className="text-dark">
          <span className="me-3">Respondidas: {preguntasRespondidas}</span>
          <span>Puntaje: {puntajeAcumulado}</span>
        </div>
      </div>
    </nav>
  )
}
