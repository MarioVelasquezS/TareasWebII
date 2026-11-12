'use client'
import React, { useEffect, useState } from 'react'
import { useCarrito } from '../../provider/ProviderCarrito'

export default function PaginaCarrito() {
  const { carrito, ordenCompra, obtenerCarrito, eliminarDelCarrito, limpiarCarrito } = useCarrito()
  const [totalPagado, setTotalPagado] = useState<number | null>(null)

  useEffect(() => {
    obtenerCarrito()
  }, [])

  const procesarPago = async () => {
    const itemsOrden = carrito.filter((item) => Number(item.ordenCompra) === Number(ordenCompra))

    const granTotal = itemsOrden.reduce((acumulado, item) => {
      return acumulado + Number(item.precio) + Number(item.isvProducto)
    }, 0)

    setTotalPagado(granTotal)
    alert(`Pago realizado con éxito para la Orden #${ordenCompra}.\nGran Total Pagado: L. ${granTotal.toFixed(2)}`)

    // Eliminamos los registros de la orden actual en la BD y limpiamos el estado global
    for (const item of itemsOrden) {
      await eliminarDelCarrito(item.idcarrito)
    }
    limpiarCarrito()
  }

  return (
    <div>
      <h2 className="mb-4">Carrito de Compras (Orden #{ordenCompra})</h2>

      {totalPagado !== null && (
        <div className="alert alert-success">
          ¡Compra procesada! Gran Total pagado (Precio + ISV): <strong>L. {totalPagado.toFixed(2)}</strong>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID Carrito</th>
              <th>ID Producto</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>ISV</th>
              <th>Subtotal</th>
              <th>Orden Compra</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted py-4">
                  No hay productos en el carrito para esta orden de compra.
                </td>
              </tr>
            ) : (
              carrito.map((item) => (
                <tr key={item.idcarrito}>
                  <td>{item.idcarrito}</td>
                  <td>{item.idproducto}</td>
                  <td>{item.nombre}</td>
                  <td>L. {Number(item.precio).toFixed(2)}</td>
                  <td>L. {Number(item.isvProducto).toFixed(2)}</td>
                  <td>L. {(Number(item.precio) + Number(item.isvProducto)).toFixed(2)}</td>
                  <td>{item.ordenCompra}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelCarrito(item.idcarrito)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-success btn-lg fw-bold"
          disabled={carrito.length === 0}
          onClick={procesarPago}
        >
          Pagar
        </button>
      </div>
    </div>
  )
}

