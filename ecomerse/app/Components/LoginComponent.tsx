'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useUsuario } from '../Provider/ProviderUsuario'

export default function LoginComponent() {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { setNombreUsuario } = useUsuario()

  const router = useRouter()

  function login() {

    if (email != '' && password != '') {
      setNombreUsuario(email)
      router.push('/Producto')
    }
    else {
      alert('Usuario incorrecto')
    }


  }
  return (
    <div>
      <div>
        <h4>Inicio de sesion</h4>
        <form className='form'>
          <input type="text"
            placeholder='Ingrese su email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> <br />



          <input type='password'
            placeholder='Ingrese contrasena'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          ></input> <br />
          <button type='button' className='btn btn-info' onClick={login}>Iniciar sesion</button> <br />

          <Link href="/Producto">Ir a la pagina de producto</Link> <br />
          <Link href="/AdminProducto">Ir a la pagina de producto</Link>
        </form>
      </div>
    </div>
  )
}
