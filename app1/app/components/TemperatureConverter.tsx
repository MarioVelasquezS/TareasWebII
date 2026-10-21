interface TemperatureProps {
  celsius: number;
}

export default function TemperatureConverter({ celsius }: TemperatureProps) {
  
  const fahrenheit = (celsius * 9) / 5 + 32;
  const kelvin = celsius + 273.15;

  return (
    <div>
      <h2>Resultados de la Conversión</h2>
      <p><strong>Temperatura Base:</strong> {celsius} °C</p>
      <p><strong>Celsius a Fahrenheit:</strong> {fahrenheit.toFixed(2)} °F</p>
      <p><strong>Celsius a Kelvin:</strong> {kelvin.toFixed(2)} K</p>
    </div>
  );
}