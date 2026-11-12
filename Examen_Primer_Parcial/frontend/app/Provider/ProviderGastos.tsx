'use client'
import React, { useContext, useRef, useState } from 'react'
import { ContextGastos } from '../Context/ContextGastos'
import { Gasto } from '../modelos/Gasto'

const API_URL = 'http://localhost:5000/gasto'
const CATEGORIAS_INICIALES = ['Comida', 'Transporte', 'Entretenimiento', 'Ropa']

export default function ProviderGastos({ children }: { children: React.ReactNode }) {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<boolean>(false)
  const [nombreUsuario, setNombreUsuario] = useState<string>('')
  const [errorLogin, setErrorLogin] = useState<string>('')

  const [presupuesto, setPresupuesto] = useState<number>(0)
  const [presupuestoEstablecido, setPresupuestoEstablecido] = useState<boolean>(false)

  const [gastos, setGastos] = useState<Gasto[]>([])
  const [categorias, setCategorias] = useState<string[]>(CATEGORIAS_INICIALES)
  const [gastoEnEdicion, setGastoEnEdicion] = useState<Gasto | null>(null)

  // Mapa en memoria para conservar la descripción asociada a cada idgasto
  // ya que la tabla MySQL "gasto" solo almacena idgasto, categoria, monto y fecha.
  const descripcionesRef = useRef<Record<number, string>>({})

  const iniciarSesion = (usuario: string, clave: string): boolean => {
    if (usuario.trim() === 'admin' && clave === 'admin123') {
      setUsuarioAutenticado(true)
      setNombreUsuario(usuario.trim())
      setErrorLogin('')
      return true
    } else {
      setErrorLogin('Credenciales incorrectas. Usuario o clave no válidos.')
      return false
    }
  }

  const cerrarSesion = () => {
    setUsuarioAutenticado(false)
    setNombreUsuario('')
    setErrorLogin('')
    setGastoEnEdicion(null)
  }

  const establecerPresupuesto = (monto: number) => {
    if (!isNaN(monto) && monto > 0) {
      setPresupuesto(Number(monto))
      setPresupuestoEstablecido(true)
    }
  }

  const agregarCategoria = (nuevaCategoria: string) => {
    const limpia = nuevaCategoria.trim()
    if (!limpia) return
    setCategorias((prev) => {
      const existe = prev.some((c) => c.toLowerCase() === limpia.toLowerCase())
      return existe ? prev : [...prev, limpia]
    })
  }

  const seleccionarGastoParaEditar = (gasto: Gasto | null) => {
    setGastoEnEdicion(gasto)
  }

  const normalizarFecha = (fechaRaw: string): string => {
    if (!fechaRaw) return ''
    return String(fechaRaw).split('T')[0]
  }

  const obtenerGastos = async (descripcionPendiente?: string) => {
    try {
      const res = await fetch(API_URL)
      if (res.ok) {
        const data: Gasto[] = await res.json()

        // Si se acaba de crear un gasto con descripción, asociarla al nuevo idgasto generado
        if (descripcionPendiente !== undefined && data.length > 0) {
          const idsConocidos = new Set(gastos.map((g) => g.idgasto))
          const nuevosRegistros = data.filter((g) => g.idgasto !== undefined && !idsConocidos.has(g.idgasto))
          if (nuevosRegistros.length > 0) {
            const ultimoNuevo = nuevosRegistros[nuevosRegistros.length - 1]
            if (ultimoNuevo.idgasto !== undefined) {
              descripcionesRef.current[ultimoNuevo.idgasto] = descripcionPendiente
            }
          } else {
            const maxIdGasto = data.reduce((max, item) =>
              (item.idgasto ?? 0) > (max.idgasto ?? 0) ? item : max
            , data[0])
            if (maxIdGasto.idgasto !== undefined) {
              descripcionesRef.current[maxIdGasto.idgasto] = descripcionPendiente
            }
          }
        }

        const gastosNormalizados: Gasto[] = data.map((item) => {
          const id = item.idgasto
          const descGuardada = id !== undefined ? descripcionesRef.current[id] : undefined
          return {
            idgasto: item.idgasto,
            categoria: item.categoria,
            monto: Number(item.monto),
            fecha: normalizarFecha(item.fecha),
            descripcion: descGuardada ?? item.descripcion ?? '',
          }
        })

        // Asegurar que categorías personalizadas existentes en la BD aparezcan en el selector
        setCategorias((prev) => {
          const conjunto = [...prev]
          for (const g of gastosNormalizados) {
            if (g.categoria && !conjunto.some((c) => c.toLowerCase() === g.categoria.toLowerCase())) {
              conjunto.push(g.categoria)
            }
          }
          return conjunto
        })

        setGastos(gastosNormalizados)
      }
    } catch (error) {
      console.error('Error al obtener gastos:', error)
    }
  }

  const guardarGasto = async (nuevoGasto: Gasto) => {
    try {
      agregarCategoria(nuevoGasto.categoria)

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoria: nuevoGasto.categoria,
          monto: Number(nuevoGasto.monto),
          fecha: nuevoGasto.fecha,
        }),
      })

      if (res.ok) {
        await obtenerGastos(nuevoGasto.descripcion || '')
      }
    } catch (error) {
      console.error('Error al guardar gasto:', error)
    }
  }

  const actualizarGasto = async (idgasto: number, gastoActualizado: Gasto) => {
    try {
      agregarCategoria(gastoActualizado.categoria)

      const res = await fetch(`${API_URL}/${idgasto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoria: gastoActualizado.categoria,
          monto: Number(gastoActualizado.monto),
          fecha: gastoActualizado.fecha,
        }),
      })

      if (res.ok) {
        descripcionesRef.current[idgasto] = gastoActualizado.descripcion || ''
        setGastoEnEdicion(null)
        await obtenerGastos()
      }
    } catch (error) {
      console.error('Error al actualizar gasto:', error)
    }
  }

  const eliminarGasto = async (idgasto: number) => {
    try {
      const res = await fetch(`${API_URL}/${idgasto}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        delete descripcionesRef.current[idgasto]
        if (gastoEnEdicion?.idgasto === idgasto) {
          setGastoEnEdicion(null)
        }
        await obtenerGastos()
      }
    } catch (error) {
      console.error('Error al eliminar gasto:', error)
    }
  }

  const totalGastado = gastos.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)

  return (
    <ContextGastos.Provider
      value={{
        usuarioAutenticado,
        nombreUsuario,
        errorLogin,
        presupuesto,
        presupuestoEstablecido,
        gastos,
        totalGastado,
        categorias,
        gastoEnEdicion,
        iniciarSesion,
        cerrarSesion,
        establecerPresupuesto,
        agregarCategoria,
        seleccionarGastoParaEditar,
        obtenerGastos: () => obtenerGastos(),
        guardarGasto,
        actualizarGasto,
        eliminarGasto,
      }}
    >
      {children}
    </ContextGastos.Provider>
  )
}

export const useContextGastos = () => useContext(ContextGastos)
export const useGastos = () => useContext(ContextGastos)

