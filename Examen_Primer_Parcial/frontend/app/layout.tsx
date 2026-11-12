import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import ProviderGastos from './Provider/ProviderGastos'

export const metadata: Metadata = {
  title: 'Administrador de Gastos Personales - Examen I Parcial',
  description: 'Aplicación Full-Stack de Administración de Gastos Personales con Next.js, Context API y Express',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-light">
        <ProviderGastos>
          <main className="container py-4">{children}</main>
        </ProviderGastos>
      </body>
    </html>
  )
}

