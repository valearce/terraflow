import { Header } from "@/components/Header";
import centinelaData from "@/data/centinela-data.json";
import { useMemo } from "react";

export default function Database() {
  // Procesar datos para la tabla
  const databaseRecords = useMemo(() => {
    const getLuzLevel = (lux: number) => {
      if (lux < 50) return "Bajo";
      if (lux < 500) return "Medio";
      return "Alto";
    };

    const getCalidadAire = (gases: number) => {
      if (gases < 60) return "Buena";
      if (gases < 100) return "Regular";
      return "Alerta";
    };

    return centinelaData.map((record, index) => ({
      id: index + 1,
      timestamp: record.Fecha_Hora,
      humidity: `${record.Humedad_Aire_Pct.toFixed(1)}%`,
      temperature: `${record.Temperatura_C.toFixed(1)}°C`,
      sun: getLuzLevel(record.Luz_Lux),
      quality: getCalidadAire(record.Gases_MQ135),
      soilHumidity: `${record.Humedad_Suelo_Pct}%`,
    }));
  }, []);

  // Calcular estadísticas
  const stats = useMemo(() => {
    if (!centinelaData || centinelaData.length === 0) {
      return { totalRecords: 0, avgHumidity: 0, avgTemp: 0, goodRecords: 0 };
    }

    const avgHumidity =
      (
        centinelaData.reduce((sum, d) => sum + d.Humedad_Aire_Pct, 0) /
        centinelaData.length
      ).toFixed(1);
    const avgTemp =
      (
        centinelaData.reduce((sum, d) => sum + d.Temperatura_C, 0) /
        centinelaData.length
      ).toFixed(1);
    const goodRecords = centinelaData.filter(
      (d) => d.Gases_MQ135 < 80
    ).length;

    return {
      totalRecords: centinelaData.length,
      avgHumidity,
      avgTemp,
      goodRecords,
    };
  }, []);

  return (
    <div className="min-h-screen bg-terraflow-cream">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title with decorative line */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-terraflow-dark mb-2">
            Monitoreo (Base de datos)
          </h1>
          <div className="h-1 w-32 bg-terraflow-orange rounded-full mb-4"></div>
          <p className="text-terraflow-dark text-opacity-70">
            Base de datos con los datos recolectados por el Centinela
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-terraflow-dark border-opacity-20">
                  <th className="bg-terraflow-green text-white px-6 py-4 text-left font-semibold text-sm">
                    Fecha y Hora
                  </th>
                  <th className="bg-terraflow-lighttan text-terraflow-dark px-6 py-4 text-left font-semibold text-sm">
                    Humedad Aire
                  </th>
                  <th className="bg-terraflow-lightgreen text-white px-6 py-4 text-left font-semibold text-sm">
                    Temperatura
                  </th>
                  <th className="bg-terraflow-orange text-white px-6 py-4 text-left font-semibold text-sm">
                    Luz Solar
                  </th>
                  <th className="bg-terraflow-brown text-white px-6 py-4 text-left font-semibold text-sm">
                    Humedad Suelo
                  </th>
                </tr>
              </thead>
              <tbody>
                {databaseRecords.map((record, idx) => (
                  <tr
                    key={record.id}
                    className={`border-b border-terraflow-dark border-opacity-10 hover:bg-terraflow-cream transition-colors ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-terraflow-dark font-medium">
                      {record.timestamp}
                    </td>
                    <td className="px-6 py-4 text-sm text-terraflow-dark">
                      {record.humidity}
                    </td>
                    <td className="px-6 py-4 text-sm text-terraflow-dark">
                      {record.temperature}
                    </td>
                    <td className="px-6 py-4 text-sm text-terraflow-dark">
                      {record.sun}
                    </td>
                    <td className="px-6 py-4 text-sm text-terraflow-dark">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.quality === "Buena"
                            ? "bg-terraflow-green text-white"
                            : "bg-terraflow-orange text-white"
                        }`}
                      >
                        {record.soilHumidity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Total de Registros
            </p>
            <p className="text-2xl font-bold text-terraflow-green">
              {stats.totalRecords}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Humedad Promedio
            </p>
            <p className="text-2xl font-bold text-terraflow-tan">
              {stats.avgHumidity}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Temperatura Promedio
            </p>
            <p className="text-2xl font-bold text-terraflow-orange">
              {stats.avgTemp}°C
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Registros Buenos
            </p>
            <p className="text-2xl font-bold text-terraflow-green">
              {stats.goodRecords}/{stats.totalRecords}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
