'use client'
import React, { useState } from 'react';
import { Tarea } from '../modelos/Tarea';

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const agregarTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !descripcion) return;
    
    setTareas([...tareas, { id: Date.now(), titulo, descripcion, estado: 'Pendiente' }]);
    setTitulo('');
    setDescripcion('');
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const cambiarEstado = (id: number, estado: string) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, estado } : t));
  };

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      
      <form onSubmit={agregarTarea}>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <button type="submit">Agregar Tarea</button>
      </form>
      
      <br />

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.descripcion}</td>
              <td>
                <select value={t.estado} onChange={e => cambiarEstado(t.id, e.target.value)}>
                  <option>Pendiente</option>
                  <option>En Proceso</option>
                  <option>Completada</option>
                </select>
              </td>
              <td>
                <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}