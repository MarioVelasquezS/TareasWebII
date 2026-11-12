'use client'
import { createContext, useContext } from 'react'
import { Gasto } from '../modelos/Gasto'

export interface GastosContextType {
  usuarioAutenticado: boolean;
  nombreUsuario: string;
  errorLogin: string;
  presupuesto: number;
  presupuestoEstablecido: boolean;
  gastos: Gasto[];
  totalGastado: number;
  categorias: string[];
  gastoEnEdicion: Gasto | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  establecerPresupuesto: (monto: number) => void;
  agregarCategoria: (nuevaCategoria: string) => void;
  seleccionarGastoParaEditar: (gasto: Gasto | null) => void;
  obtenerGastos: () => Promise<void>;
  guardarGasto: (nuevoGasto: Gasto) => Promise<void>;
  actualizarGasto: (idgasto: number, gastoActualizado: Gasto) => Promise<void>;
  eliminarGasto: (idgasto: number) => Promise<void>;
}

export const ContextGastos = createContext<GastosContextType>({
  usuarioAutenticado: false,
  nombreUsuario: '',
  errorLogin: '',
  presupuesto: 0,
  presupuestoEstablecido: false,
  gastos: [],
  totalGastado: 0,
  categorias: ['Comida', 'Transporte', 'Entretenimiento', 'Ropa'],
  gastoEnEdicion: null,
  iniciarSesion: () => false,
  cerrarSesion: () => {},
  establecerPresupuesto: () => {},
  agregarCategoria: () => {},
  seleccionarGastoParaEditar: () => {},
  obtenerGastos: async () => {},
  guardarGasto: async () => {},
  actualizarGasto: async () => {},
  eliminarGasto: async () => {},
})

export const useContextGastos = () => useContext(ContextGastos)
export const useGastos = () => useContext(ContextGastos)

