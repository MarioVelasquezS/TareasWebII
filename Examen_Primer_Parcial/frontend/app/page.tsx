'use client'
import React from 'react'
import { useContextGastos } from './Context/ContextGastos'
import LoginComponent from './Components/LoginComponent'
import PresupuestoComponent from './Components/PresupuestoComponent'
import RegistroGastosComponent from './Components/RegistroGastosComponent'

export default function Home() {
  const { usuarioAutenticado, presupuestoEstablecido } = useContextGastos()

  return (
    <div>
      {!usuarioAutenticado ? (
        <LoginComponent />
      ) : (
        <>
          <PresupuestoComponent />
          {presupuestoEstablecido && <RegistroGastosComponent />}
        </>
      )}
    </div>
  )
}

