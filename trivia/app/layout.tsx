
import 'bootstrap/dist/css/bootstrap.css'
import { TriviaProvider } from "../context/TriviaContext";
import { Header } from "../components/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white">
        <TriviaProvider>
          <Header />
          <main className="container mt-4">{children}</main>
        </TriviaProvider>
      </body>
    </html>
  );
}

