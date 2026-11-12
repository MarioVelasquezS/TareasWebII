'use client'
import React, { useContext, useState } from 'react'
import { ContextCarrito } from '../context/ContextCarrito'
import { ItemCarrito } from '../modelos/Carrito'

const API_URL = 'http://localhost:5001/api/carrito'

export default function ProviderCarrito({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [ordenCompra] = useState<number>(1)

  const obtenerCarrito = async () => {
    try {
      const res = await fetch(`${API_URL}/${ordenCompra}`)
      if (res.ok) {
        const data: ItemCarrito[] = await res.json()
        setCarrito(data)
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error)
    }
  }

  const agregarAlCarrito = async (idproducto: number, isvProducto: number, orden: number) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idproducto, isvProducto, ordenCompra: orden }),
      })

      if (res.ok) {
        await obtenerCarrito()
        alert('Producto agregado al carrito exitosamente')
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
    }
  }

  const eliminarDelCarrito = async (idcarrito: number) => {
    try {
      const res = await fetch(`${API_URL}/${idcarrito}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await obtenerCarrito()
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error)
    }
  }

  const limpiarCarrito = () => {
    setCarrito([])
  }

  return (
    <ContextCarrito.Provider
      value={{
        carrito,
        ordenCompra,
        agregarAlCarrito,
        obtenerCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
      }}
    >
      {children}
    </ContextCarrito.Provider>
  )
}

export const useCarrito = () => useContext(ContextCarrito)

