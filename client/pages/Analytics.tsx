import { Header } from "@/components/Header";
import { useMemo } from "react";
import centinelaData from "@/data/centinela-data.json";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Procesar datos para gráficos
const getChartData = () => {
  // Agrupar datos por cada 5 registros para la gráfica de barras
  const barData = [];
  for (let i = 0; i < centinelaData.length; i += 5) {
    barData.push({
      name: `${i + 1}`,
      temperatura: parseFloat(centinelaData[i].Temperatura_C.toFixed(1)),
      humedad: parseFloat(centinelaData[i].Humedad_Aire_Pct.toFixed(1)),
    });
  }

  // Categorizar datos por calidad del aire
  const pieData = [
    {
      name: "Óptimo",
      value: centinelaData.filter((d) => d.Gases_MQ135 < 50).length,
    },
    {
      name: "Bueno",
      value: centinelaData.filter((d) => d.Gases_MQ135 >= 50 && d.Gases_MQ135 < 80).length,
    },
    {
      name: "Regular",
      value: centinelaData.filter((d) => d.Gases_MQ135 >= 80 && d.Gases_MQ135 < 120).length,
    },
    {
      name: "Alerta",
      value: centinelaData.filter((d) => d.Gases_MQ135 >= 120).length,
    },
  ];

  return { barData, pieData };
};

const { barData, pieData } = getChartData();

const COLORS = [
  "#7A9856", // green
  "#A8C766", // light green
  "#D97E3A", // orange
  "#8B6F47", // brown
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-terraflow-cream">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
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
        <p className="text-terraflow-dark text-opacity-70 text-lg mb-12 flex items-center gap-2">
          <span className="text-2xl">↑</span> Cómo se comportan los datos en conjunto
        </p>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-terraflow-dark mb-6">
              Gráfica 1: Tendencias Semanales
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC8" />
                <XAxis
                  dataKey="name"
                  stroke="#5A6B4A"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#5A6B4A" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F5F1E8",
                    border: "2px solid #7A9856",
                  }}
                />
                <Bar dataKey="value" fill="#7A9856" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-terraflow-dark mb-6 w-full">
              Gráfica 2: Distribución de Estados
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F5F1E8",
                    border: "2px solid #7A9856",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {pieData.map((item) => {
            const percentage = (
              (item.value / centinelaData.length) *
              100
            ).toFixed(0);
            const colorMap: Record<string, string> = {
              Óptimo: "bg-terraflow-green",
              Bueno: "bg-terraflow-lightgreen",
              Regular: "bg-terraflow-orange",
              Alerta: "bg-terraflow-brown",
            };
            return (
              <div
                key={item.name}
                className={`${colorMap[item.name]} rounded-lg p-4 text-white text-center shadow`}
              >
                <p className="text-sm font-semibold opacity-90">{item.name}</p>
                <p className="text-2xl font-bold">{percentage}%</p>
                <p className="text-xs opacity-75 mt-1">({item.value} registros)</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
