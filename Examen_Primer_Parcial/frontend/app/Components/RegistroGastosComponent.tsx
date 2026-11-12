'use client'
import React, { useEffect, useState } from 'react'
import { useContextGastos } from '../Context/ContextGastos'
import { Gasto } from '../modelos/Gasto'

export default function RegistroGastosComponent() {
  const {
    presupuesto,
    gastos,
    totalGastado,
    categorias,
    gastoEnEdicion,
    agregarCategoria,
    seleccionarGastoParaEditar,
    obtenerGastos,
    guardarGasto,
    actualizarGasto,
    eliminarGasto,
  } = useContextGastos()

  const [monto, setMonto] = useState<string>('')
  const [descripcion, setDescripcion] = useState<string>('')
  const [categoria, setCategoria] = useState<string>('Comida')
  const [nuevaCategoria, setNuevaCategoria] = useState<string>('')
  const [modoNuevaCategoria, setModoNuevaCategoria] = useState<boolean>(false)
  const [fecha, setFecha] = useState<string>('')

  useEffect(() => {
    obtenerGastos()
  }, [])

  useEffect(() => {
    if (gastoEnEdicion) {
      setMonto(String(gastoEnEdicion.monto))
      setDescripcion(gastoEnEdicion.descripcion || '')
      setCategoria(gastoEnEdicion.categoria || 'Comida')
      setFecha(gastoEnEdicion.fecha ? String(gastoEnEdicion.fecha).split('T')[0] : '')
      setModoNuevaCategoria(false)
      setNuevaCategoria('')
    }
  }, [gastoEnEdicion])

  const limpiarFormulario = () => {
    setMonto('')
    setDescripcion('')
    setCategoria(categorias[0] || 'Comida')
    setNuevaCategoria('')
    setModoNuevaCategoria(false)
    setFecha('')
    seleccionarGastoParaEditar(null)
  }

  const manejarCambioCategoria = (valor: string) => {
    if (valor === '__NUEVA__') {
      setModoNuevaCategoria(true)
      setNuevaCategoria('')
    } else {
      setModoNuevaCategoria(false)
      setCategoria(valor)
    }
  }

  const confirmarNuevaCategoria = () => {
    const limpia = nuevaCategoria.trim()
    if (!limpia) return
    agregarCategoria(limpia)
    setCategoria(limpia)
    setNuevaCategoria('')
    setModoNuevaCategoria(false)
  }

  const manejarSubmitGasto = async (e: React.FormEvent) => {
    e.preventDefault()

    const categoriaFinal = modoNuevaCategoria ? nuevaCategoria.trim() : categoria.trim()
    if (!monto || Number(monto) <= 0 || !categoriaFinal || !fecha) {
      return
    }

    if (modoNuevaCategoria && categoriaFinal) {
      agregarCategoria(categoriaFinal)
    }

    const datosGasto: Gasto = {
      categoria: categoriaFinal,
      monto: Number(monto),
      fecha,
      descripcion: descripcion.trim(),
    }

    if (gastoEnEdicion && gastoEnEdicion.idgasto !== undefined) {
      await actualizarGasto(gastoEnEdicion.idgasto, datosGasto)
    } else {
      await guardarGasto(datosGasto)
    }

    limpiarFormulario()
  }

  const presupuestoFormateado = Number(presupuesto).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const porcentajeGastado = presupuesto > 0 ? (totalGastado / presupuesto) * 100 : 0
  const alcanzoOchentaPorCiento = presupuesto > 0 && porcentajeGastado >= 80 && porcentajeGastado <= 100
  const superoLimite = presupuesto > 0 && porcentajeGastado > 100

  return (
    <div className="row justify-content-center mt-4 mb-5">
      <div className="col-12 col-lg-10">
        <div className="card shadow-sm border-0 p-4">
          <div className="card-body">
            <h4 className="text-center mb-3 fw-bold">
              Presupuesto Establecido Lps. {presupuestoFormateado}
            </h4>

            {alcanzoOchentaPorCiento && (
              <div className="alert alert-warning text-center mb-4" role="alert">
                Ha alcanzado el 80% del presupuesto
              </div>
            )}

            {superoLimite && (
              <div className="alert alert-danger text-center mb-4" role="alert">
                Has superado el límite del presupuesto, debes ajustar gastos
              </div>
            )}

            <form onSubmit={manejarSubmitGasto} className="mb-4">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  {!modoNuevaCategoria ? (
                    <select
                      className="form-select"
                      value={categoria}
                      onChange={(e) => manejarCambioCategoria(e.target.value)}
                      required
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__NUEVA__">+ Agregar categoría personalizada...</option>
                    </select>
                  ) : (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nueva categoría"
                        value={nuevaCategoria}
                        onChange={(e) => setNuevaCategoria(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={confirmarNuevaCategoria}
                      >
                        Agregar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setModoNuevaCategoria(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-4">
                  {gastoEnEdicion ? 'Actualizar Gasto' : 'Guardar Gasto'}
                </button>
                {gastoEnEdicion && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2 px-3"
                    onClick={limpiarFormulario}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {gastos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-3">
                        No hay gastos registrados.
                      </td>
                    </tr>
                  ) : (
                    gastos.map((gasto) => (
                      <tr key={gasto.idgasto}>
                        <td>{Number(gasto.monto).toFixed(2)}</td>
                        <td>{gasto.descripcion || '-'}</td>
                        <td>{gasto.categoria}</td>
                        <td>{gasto.fecha}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() => seleccionarGastoParaEditar(gasto)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (gasto.idgasto !== undefined) {
                                eliminarGasto(gasto.idgasto)
                              }
                            }}
                          >
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

