-- Crear tabla para los datos del Centinela
CREATE TABLE IF NOT EXISTS sensor_data (
  id SERIAL PRIMARY KEY,
  fecha_hora TIMESTAMP NOT NULL,
  temperatura_c DECIMAL(5, 2),
  humedad_aire_pct DECIMAL(5, 2),
  luz_lux DECIMAL(10, 2),
  gases_mq135 DECIMAL(10, 2),
  humedad_suelo_pct DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice en fecha_hora para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_sensor_data_fecha_hora ON sensor_data(fecha_hora);

-- Crear vista para datos más recientes
CREATE OR REPLACE VIEW latest_sensor_data AS
SELECT * FROM sensor_data
ORDER BY fecha_hora DESC
LIMIT 100;
