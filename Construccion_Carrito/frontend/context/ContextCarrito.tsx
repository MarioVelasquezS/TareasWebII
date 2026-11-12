'use client'
import { createContext } from 'react'
import { ItemCarrito } from '../modelos/Carrito'

export interface CarritoContextType {
  carrito: ItemCarrito[];
  ordenCompra: number;
  agregarAlCarrito: (idproducto: number, isvProducto: number, ordenCompra: number) => Promise<void>;
  obtenerCarrito: () => Promise<void>;
  eliminarDelCarrito: (idcarrito: number) => Promise<void>;
  limpiarCarrito: () => void;
}

export const ContextCarrito = createContext<CarritoContextType>({
  carrito: [],
  ordenCompra: 1,
  agregarAlCarrito: async () => {},
  obtenerCarrito: async () => {},
  eliminarDelCarrito: async () => {},
  limpiarCarrito: () => {},
})

