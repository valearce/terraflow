import { Header } from "@/components/Header";
import { BackgroundBirds } from "@/components/BackgroundBirds";
import { Cloud, Sun, Wind, Droplets } from "lucide-react";

export default function Dashboard() {
  // Mock data - in a real app, this would come from an API
  const sensorData = [
    {
      id: 1,
      label: "Humedad y Temperatura Aire",
      value: "72%",
      subtitle: "Air Humidity & Temperature",
      icon: Cloud,
      color: "bg-terraflow-green",
      textColor: "text-white",
    },
    {
      id: 2,
      label: "Sol",
      value: "High",
      subtitle: "Sunlight",
      icon: Sun,
      color: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      id: 3,
      label: "Calidad Aire",
      value: "Good",
      subtitle: "Air Quality",
      icon: Wind,
      color: "bg-terraflow-lightgreen",
      textColor: "text-white",
    },
    {
      id: 4,
      label: "Humedad Tierra",
      value: "65%",
      subtitle: "Soil Humidity",
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
          Monitoreo en tiempo real de tus sensores agrícolas
        </p>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sensor Cards Column */}
          <div className="lg:col-span-2 space-y-6">
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

          {/* Recommendation Card */}
          <div className="lg:col-span-1">
            <div className="border-4 border-terraflow-orange rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-terraflow-orange mb-6">
                Recomendación
              </h2>
              <div className="bg-terraflow-lighttan rounded-lg p-5 border-l-4 border-terraflow-orange">
                <p className="text-terraflow-dark font-semibold text-sm mb-3">
                  Recomendación que genera el modelo de IA
                </p>
                <p className="text-sm text-terraflow-dark opacity-75 leading-relaxed">
                  Optimizar el riego considerando la humedad actual del suelo y
                  las predicciones de temperatura para maximizar la eficiencia
                  agrícola.
                </p>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xs font-semibold text-terraflow-dark mb-4 uppercase opacity-70">
                Datos en tiempo real
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 pb-3 border-b border-terraflow-dark border-opacity-10">
                  <span className="text-terraflow-green font-bold mt-1">✓</span>
                  <span className="text-terraflow-dark">
                    La humedad del aire está en niveles óptimos
                  </span>
                </li>
                <li className="flex items-start gap-3 pb-3 border-b border-terraflow-dark border-opacity-10">
                  <span className="text-terraflow-orange font-bold mt-1">!</span>
                  <span className="text-terraflow-dark">
                    La humedad del suelo requiere monitoreo continuo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terraflow-green font-bold mt-1">✓</span>
                  <span className="text-terraflow-dark">
                    La calidad del aire es buena
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
