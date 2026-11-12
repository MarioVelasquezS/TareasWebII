'use client'
import React, { useState } from 'react'
import { useContextGastos } from '../Context/ContextGastos'

export default function PresupuestoComponent() {
  const { presupuesto, totalGastado, establecerPresupuesto } = useContextGastos()
  const [montoInput, setMontoInput] = useState<string>(presupuesto > 0 ? String(presupuesto) : '')
  const [mensajeError, setMensajeError] = useState<string>('')

  const manejarGuardarPresupuesto = (e: React.FormEvent) => {
    e.preventDefault()
    const valor = Number(montoInput)
    if (isNaN(valor) || valor <= 0) {
      setMensajeError('Por favor ingrese un monto de presupuesto válido mayor a 0.')
      return
    }
    setMensajeError('')
    establecerPresupuesto(valor)
  }

  const porcentajeGastado = presupuesto > 0 ? (totalGastado / presupuesto) * 100 : 0
  const alcanzoOchentaPorCiento = presupuesto > 0 && porcentajeGastado >= 80 && porcentajeGastado <= 100
  const superoLimite = presupuesto > 0 && porcentajeGastado > 100

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 p-4">
          <div className="card-body">
            <h4 className="text-center mb-4 fw-bold">Establecer Presupuesto Mensual</h4>

            {mensajeError && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {mensajeError}
              </div>
            )}

            <form onSubmit={manejarGuardarPresupuesto}>
              <div className="mb-3">
                <input
                  type="text"
                  inputMode="decimal"
                  className="form-control shadow-none border-secondary-subtle"
                  placeholder="Monto de presupuesto Mensual"
                  value={montoInput}
                  onChange={(e) => {
                    const valor = e.target.value
                    if (/^\d*\.?\d*$/.test(valor)) {
                      setMontoInput(valor)
                    }
                  }}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Guardar Presupuesto
                </button>
              </div>
            </form>

            {alcanzoOchentaPorCiento && (
              <div className="alert alert-warning text-center mt-3 mb-0" role="alert">
                Ha alcanzado el 80% del presupuesto
              </div>
            )}

            {superoLimite && (
              <div className="alert alert-danger text-center mt-3 mb-0" role="alert">
                Has superado el límite del presupuesto, debes ajustar gastos
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

