import TemperatureConverter from "./components/TemperatureConverter";

export default function Home() {
  // Variable inicializada con la temperatura base
  const temperaturaInicial: number = 25;

  return (
    <main>
      <h1>Tarea: Conversor de Temperatura</h1>

      {}
      <TemperatureConverter celsius={temperaturaInicial} />
    </main>
  );
}