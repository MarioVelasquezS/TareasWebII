'use client'
import React, { useEffect, useState } from 'react'
import { Pregunta } from '../modelos/Pregunta'
import { useTrivia } from '../context/TriviaContext'

const crearPreguntas = (): Pregunta[] => [
  { idPregunas: '1', DescripcionPregunta: 'React es una librería de JavaScript para construir interfaces de usuario.', opcionRespuesta1: true, opcionRespuesta2: false, respuestaCorrecta: true, puntajePregunta: 10 },
  { idPregunas: '2', DescripcionPregunta: 'TypeScript es un lenguaje que no tiene tipado estático.', opcionRespuesta1: true, opcionRespuesta2: false, respuestaCorrecta: false, puntajePregunta: 10 },
  { idPregunas: '3', DescripcionPregunta: 'El hook useEffect se utiliza para manejar efectos secundarios.', opcionRespuesta1: true, opcionRespuesta2: false, respuestaCorrecta: true, puntajePregunta: 10 },
  { idPregunas: '4', DescripcionPregunta: 'Bootstrap es un framework de CSS.', opcionRespuesta1: true, opcionRespuesta2: false, respuestaCorrecta: true, puntajePregunta: 10 },
  { idPregunas: '5', DescripcionPregunta: 'Context API obliga a pasar los datos mediante props en cada nivel.', opcionRespuesta1: true, opcionRespuesta2: false, respuestaCorrecta: false, puntajePregunta: 10 },
]

export default function Home() {
  const { puntajeAcumulado, preguntasRespondidas, incrementarPuntaje, incrementarRespondidas, reiniciarJuego } = useTrivia()

  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [indiceActual, setIndiceActual] = useState<number>(0)
  const [seleccion, setSeleccion] = useState<boolean | null>(null)
  const [respondida, setRespondida] = useState<boolean>(false)
  const [acerto, setAcerto] = useState<boolean>(false)
  const [juegoTerminado, setJuegoTerminado] = useState<boolean>(false)

  useEffect(() => {
    setPreguntas(crearPreguntas().slice(0, 5))
  }, [])

  const preguntaActual = preguntas[indiceActual]

  const responder = (opcion: boolean) => {
    if (respondida || !preguntaActual) return
    const esCorrecta = opcion === preguntaActual.respuestaCorrecta
    setSeleccion(opcion)
    setRespondida(true)
    setAcerto(esCorrecta)
    if (esCorrecta) {
      incrementarPuntaje(preguntaActual.puntajePregunta)
    }
    incrementarRespondidas()
  }

  const siguiente = () => {
    if (indiceActual + 1 >= preguntas.length) {
      setJuegoTerminado(true)
    } else {
      setIndiceActual(indiceActual + 1)
    }
    setSeleccion(null)
    setRespondida(false)
    setAcerto(false)
  }

  const reiniciar = () => {
    reiniciarJuego()
    setPreguntas(crearPreguntas().slice(0, 5))
    setIndiceActual(0)
    setSeleccion(null)
    setRespondida(false)
    setAcerto(false)
    setJuegoTerminado(false)
  }

  if (juegoTerminado) {
    return (
      <div className="text-center">
        <h2>¡Trivia completada!</h2>
        <p>
          Respondiste {preguntasRespondidas} preguntas y obtuviste {puntajeAcumulado} puntos.
        </p>
        <button className="btn border bg-white text-dark shadow-none" onClick={reiniciar}>Reiniciar juego</button>
      </div>
    )
  }

  if (!preguntaActual) {
    return <div className="text-muted">Cargando preguntas...</div>
  }

  return (
    <div className="card">
      <div className="card-header">
        Pregunta {indiceActual + 1} de {preguntas.length}
        <span className="ms-2 text-muted">{preguntaActual.puntajePregunta} pts</span>
      </div>
      <div className="card-body">
        <h5 className="card-title mb-4">{preguntaActual.DescripcionPregunta}</h5>
        <div className="d-flex gap-2 mb-3">
          <button className={`btn border bg-white text-dark shadow-none ${seleccion === true ? 'border-dark fw-bold' : ''}`} disabled={respondida} onClick={() => responder(preguntaActual.opcionRespuesta1)}>
            Verdadero
          </button>
          <button className={`btn border bg-white text-dark shadow-none ${seleccion === false ? 'border-dark fw-bold' : ''}`} disabled={respondida} onClick={() => responder(preguntaActual.opcionRespuesta2)}>
            Falso
          </button>
        </div>

        {respondida && (
          <p className={acerto ? 'text-success' : 'text-danger'} role="status">
            {acerto
              ? `¡Correcto! Ganaste ${preguntaActual.puntajePregunta} puntos.`
              : `Incorrecto. La respuesta correcta era ${preguntaActual.respuestaCorrecta ? 'Verdadero' : 'Falso'}.`}
          </p>
        )}

        {seleccion !== null && (
          <button className="btn border bg-white text-dark shadow-none" onClick={siguiente}>
            {indiceActual + 1 >= preguntas.length ? 'Finalizar' : 'Siguiente'}
          </button>
        )}
      </div>
    </div>
  )
}

