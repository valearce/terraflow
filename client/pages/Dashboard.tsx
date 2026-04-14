import { Header } from "@/components/Header";
import { BackgroundBirds } from "@/components/BackgroundBirds";
import { Cloud, Sun, Wind, Droplets } from "lucide-react";
import { useMemo } from "react";
import centinelaData from "@/data/centinela-data.json";

export default function Dashboard() {
  // Calcular estadísticas de los datos reales
  const stats = useMemo(() => {
    if (!centinelaData || centinelaData.length === 0) {
      return {
        lastData: null,
        avgTemp: 0,
        avgHumedad: 0,
        avgLuz: 0,
        avgGases: 0,
        lastHumedadSuelo: 0,
      };
    }

    const lastData = centinelaData[centinelaData.length - 1];
    const avgTemp =
      (
        centinelaData.reduce((sum, d) => sum + d.Temperatura_C, 0) /
        centinelaData.length
      ).toFixed(1);
    const avgHumedad =
      (
        centinelaData.reduce((sum, d) => sum + d.Humedad_Aire_Pct, 0) /
        centinelaData.length
      ).toFixed(1);
    const avgLuz =
      (
        centinelaData.reduce((sum, d) => sum + d.Luz_Lux, 0) /
        centinelaData.length
      ).toFixed(0);
    const avgGases =
      (
        centinelaData.reduce((sum, d) => sum + d.Gases_MQ135, 0) /
        centinelaData.length
      ).toFixed(0);

    return {
      lastData,
      avgTemp,
      avgHumedad,
      avgLuz,
      avgGases,
      lastHumedadSuelo: lastData.Humedad_Suelo_Pct,
    };
  }, []);

  // Determinar nivel de luz
  const getLuzLevel = (lux: number) => {
    if (lux < 50) return "Bajo";
    if (lux < 500) return "Medio";
    return "Alto";
  };

  // Determinar calidad del aire
  const getCalidadAire = (gases: number) => {
    if (gases < 60) return "Buena";
    if (gases < 100) return "Regular";
    return "Alerta";
  };

  const sensorData = [
    {
      id: 1,
      label: "Humedad y Temperatura Aire",
      value: `${stats.avgHumedad}%`,
      subtitle: "Promedio Humedad del Aire",
      icon: Cloud,
      color: "bg-terraflow-green",
      textColor: "text-white",
    },
    {
      id: 2,
      label: "Sol",
      value: getLuzLevel(parseFloat(stats.avgLuz as any)),
      subtitle: "Luz Solar (Promedio)",
      icon: Sun,
      color: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      id: 3,
      label: "Calidad Aire",
      value: getCalidadAire(parseFloat(stats.avgGases as any)),
      subtitle: "Calidad del Aire",
      icon: Wind,
      color: "bg-terraflow-lightgreen",
      textColor: "text-white",
    },
    {
      id: 4,
      label: "Humedad Tierra",
      value: `${stats.lastHumedadSuelo}%`,
      subtitle: "Humedad del Suelo (Última)",
      icon: Droplets,
      color: "bg-terraflow-orange",
      textColor: "text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-terraflow-cream">
      <Header />

      <div className="relative">
        <BackgroundBirds />
        <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Page Title with decorative line */}
        <div className="mb-12 flex items-center gap-4">
          <div>
            <h1 className="text-5xl font-bold text-terraflow-dark mb-1">
              Terraflow
            </h1>
            <div className="h-1 w-32 bg-terraflow-orange rounded-full"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-terraflow-dark text-opacity-70 mb-12 text-lg">
          Monitorea tus sensores agrícolas en tiempo real
        </p>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sensor Cards Column */}
          <div className="space-y-6">
            {sensorData.map((sensor) => {
              const Icon = sensor.icon;
              return (
                <div
                  key={sensor.id}
                  className={`${sensor.color} ${sensor.textColor} rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold opacity-90 mb-2">
                        {sensor.label}
                      </h3>
                      <p className="text-4xl font-bold">{sensor.value}</p>
                      <p className="text-xs opacity-75 mt-1">{sensor.subtitle}</p>
                    </div>
                    <div className="opacity-25">
                      <Icon size={56} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations & AI Modes */}
          <div className="space-y-6">
            {/* Main Recommendation Card */}
            <div className="border-4 border-terraflow-orange rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-terraflow-orange mb-6">
                Análisis y Recomendaciones de IA
              </h2>

              {/* Resumen Rápido */}
              <div className="bg-terraflow-lighttan rounded-lg p-5 border-l-4 border-terraflow-orange mb-6">
                <p className="text-terraflow-dark font-semibold text-sm mb-2">
                  Recomendación Rápida
                </p>
                <p className="text-sm text-terraflow-dark opacity-75 leading-relaxed">
                  {stats.lastHumedadSuelo > 75
                    ? "Reduce el riego: la humedad del suelo es óptima."
                    : stats.lastHumedadSuelo > 65
                      ? "Mantén el riego actual: niveles de humedad estables."
                      : "Aumenta el riego: humedad del suelo baja."}
                </p>
              </div>

              {/* Modo 1: Diagnóstico Forense */}
              <div className="mb-6 pb-6 border-b border-terraflow-dark border-opacity-20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-terraflow-green rounded-full"></div>
                  <h3 className="text-lg font-bold text-terraflow-dark">
                    Modo 1: Diagnóstico Forense (Chequeo)
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-terraflow-dark space-y-3">
                  <p>
                    <span className="font-semibold">Informe de Salud:</span> Contrasta el microclima interior con el clima exterior de la sabana de Bogotá.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded border-l-2 border-terraflow-green">
                      <p className="font-semibold text-terraflow-green">Absorción Hídrica</p>
                      <p className="opacity-75">Normal</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-2 border-terraflow-orange">
                      <p className="font-semibold text-terraflow-orange">Estrés Térmico-Lumínico</p>
                      <p className="opacity-75">{parseFloat(stats.avgTemp as any) > 26 ? "Moderado" : "Bajo"}</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-2 border-terraflow-green col-span-2">
                      <p className="font-semibold text-terraflow-green">Desarrollo Estructural</p>
                      <p className="opacity-75">Dentro de parámetros normales según bitácora visual</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modo 2: Plan de Acción Estratégico */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-terraflow-orange rounded-full"></div>
                  <h3 className="text-lg font-bold text-terraflow-dark">
                    Modo 2: Plan de Acción Estratégico (24h)
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-terraflow-dark space-y-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-terraflow-orange mb-2">
                      Estado Operativo
                    </p>
                    <div className={`inline-block px-4 py-2 rounded-lg font-bold text-white ${
                      stats.lastHumedadSuelo < 60 ? "bg-red-500" : "bg-terraflow-green"
                    }`}>
                      {stats.lastHumedadSuelo < 60 ? "⚠️ URGENTE" : "✓ ESPERAR"}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase font-bold text-terraflow-dark mb-2">
                      Dosificación de Riego
                    </p>
                    <div className="bg-white p-3 rounded border-l-4 border-terraflow-orange">
                      <p className="font-semibold text-terraflow-orange">
                        {stats.lastHumedadSuelo < 65 ? "45-50 ml Correctivo" : "45-50 ml Preventivo"}
                      </p>
                      <p className="text-xs opacity-75 mt-1">
                        Límites operativos: 45-50 ml para evitar hipoxia
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border-l-2 border-terraflow-green text-xs">
                      <p className="font-semibold text-terraflow-green mb-1">Microclima</p>
                      <p className="opacity-75">Aislamiento térmico activo</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-2 border-terraflow-orange text-xs">
                      <p className="font-semibold text-terraflow-orange mb-1">Fenología</p>
                      <p className="opacity-75">Evaluar uso de tutores</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Summary */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xs font-semibold text-terraflow-dark mb-4 uppercase opacity-70">
                Datos en tiempo real
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 pb-3 border-b border-terraflow-dark border-opacity-10">
                  <span
                    className={`font-bold mt-1 ${
                      parseFloat(stats.avgHumedad as any) > 50
                        ? "text-terraflow-green"
                        : "text-terraflow-orange"
                    }`}
                  >
                    {parseFloat(stats.avgHumedad as any) > 50 ? "✓" : "!"}
                  </span>
                  <span className="text-terraflow-dark">
                    Humedad del aire: {stats.avgHumedad}%
                  </span>
                </li>
                <li className="flex items-start gap-3 pb-3 border-b border-terraflow-dark border-opacity-10">
                  <span
                    className={`font-bold mt-1 ${
                      stats.lastHumedadSuelo > 70
                        ? "text-terraflow-green"
                        : "text-terraflow-orange"
                    }`}
                  >
                    {stats.lastHumedadSuelo > 70 ? "✓" : "!"}
                  </span>
                  <span className="text-terraflow-dark">
                    Humedad del suelo: {stats.lastHumedadSuelo}%
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className={`font-bold mt-1 ${
                      parseFloat(stats.avgGases as any) < 80
                        ? "text-terraflow-green"
                        : "text-terraflow-orange"
                    }`}
                  >
                    {parseFloat(stats.avgGases as any) < 80 ? "✓" : "!"}
                  </span>
                  <span className="text-terraflow-dark">
                    Temperatura: {stats.avgTemp}°C
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
