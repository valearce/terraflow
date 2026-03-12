import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-terraflow-cream">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold text-terraflow-orange mb-4">404</h1>
          <p className="text-2xl text-terraflow-dark mb-2 font-semibold">
            Página no encontrada
          </p>
          <p className="text-terraflow-dark text-opacity-70 mb-8 max-w-md">
            La página que buscas no existe. Por favor, regresa al panel de control.
          </p>
          <Link
            to="/"
            className="inline-block bg-terraflow-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Volver al Panel de Control
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
