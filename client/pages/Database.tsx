import { Header } from "@/components/Header";

// Mock database records
const databaseRecords = [
  {
    id: 1,
    timestamp: "2026-03-10 08:00",
    humidity: "72%",
    temperature: "24°C",
    sun: "High",
    quality: "Good",
  },
  {
    id: 2,
    timestamp: "2026-03-10 09:00",
    humidity: "68%",
    temperature: "25°C",
    sun: "High",
    quality: "Good",
  },
  {
    id: 3,
    timestamp: "2026-03-10 10:00",
    humidity: "65%",
    temperature: "26°C",
    sun: "Very High",
    quality: "Good",
  },
  {
    id: 4,
    timestamp: "2026-03-10 11:00",
    humidity: "62%",
    temperature: "27°C",
    sun: "Very High",
    quality: "Good",
  },
  {
    id: 5,
    timestamp: "2026-03-10 12:00",
    humidity: "58%",
    temperature: "28°C",
    sun: "Extreme",
    quality: "Fair",
  },
  {
    id: 6,
    timestamp: "2026-03-10 13:00",
    humidity: "61%",
    temperature: "27°C",
    sun: "Very High",
    quality: "Good",
  },
  {
    id: 7,
    timestamp: "2026-03-10 14:00",
    humidity: "64%",
    temperature: "26°C",
    sun: "High",
    quality: "Good",
  },
  {
    id: 8,
    timestamp: "2026-03-10 15:00",
    humidity: "68%",
    temperature: "25°C",
    sun: "Medium",
    quality: "Good",
  },
];

export default function Database() {
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
                    Timestamp
                  </th>
                  <th className="bg-terraflow-lighttan text-terraflow-dark px-6 py-4 text-left font-semibold text-sm">
                    Humedad
                  </th>
                  <th className="bg-terraflow-lightgreen text-white px-6 py-4 text-left font-semibold text-sm">
                    Temperatura
                  </th>
                  <th className="bg-terraflow-orange text-white px-6 py-4 text-left font-semibold text-sm">
                    Sol
                  </th>
                  <th className="bg-terraflow-brown text-white px-6 py-4 text-left font-semibold text-sm">
                    Calidad Aire
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
                          record.quality === "Good"
                            ? "bg-terraflow-green text-white"
                            : "bg-terraflow-orange text-white"
                        }`}
                      >
                        {record.quality}
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
              Total Records
            </p>
            <p className="text-2xl font-bold text-terraflow-green">
              {databaseRecords.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Avg Humidity
            </p>
            <p className="text-2xl font-bold text-terraflow-tan">65%</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Avg Temperature
            </p>
            <p className="text-2xl font-bold text-terraflow-orange">26°C</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-xs text-terraflow-dark text-opacity-70 mb-1">
              Good Records
            </p>
            <p className="text-2xl font-bold text-terraflow-green">7/8</p>
          </div>
        </div>
      </main>
    </div>
  );
}
