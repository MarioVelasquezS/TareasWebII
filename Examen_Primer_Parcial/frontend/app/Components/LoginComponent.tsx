'use client'
import React, { useState } from 'react'
import { useContextGastos } from '../Context/ContextGastos'

export default function LoginComponent() {
  const [usuario, setUsuario] = useState<string>('')
  const [clave, setClave] = useState<string>('')

  const { iniciarSesion, errorLogin } = useContextGastos()

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault()
    iniciarSesion(usuario, clave)
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card shadow-sm border-0 p-4">
          <div className="card-body">
            <h4 className="text-center mb-4 fw-bold">Mis Gastos Inicio de Sesión</h4>

            {errorLogin && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {errorLogin}
              </div>
            )}

            <form onSubmit={manejarLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control shadow-none border-secondary-subtle"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control shadow-none border-secondary-subtle"
                  placeholder="Clave"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

