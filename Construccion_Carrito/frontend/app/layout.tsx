import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css'
import ProviderCarrito from "../provider/ProviderCarrito";
import { NavBar } from "../components/NavBar";

export const metadata: Metadata = {
  title: "Carrito de Compras - Desarrollo Web II",
  description: "Integración Full-Stack de Carrito de Compras con Next.js, Express y MySQL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white">
        <ProviderCarrito>
          <NavBar />
          <main className="container mt-4">{children}</main>
        </ProviderCarrito>
      </body>
    </html>
  );
}

