# DOCUMENTACIÓN TÉCNICA - TERRAFLOW

## 1. ARQUITECTURA GENERAL

Terraflow es una aplicación **full-stack** que funciona con dos partes principales:

- **Frontend (lo que ves en el navegador)**: React + TypeScript + TailwindCSS
- **Backend (el servidor)**: Express + Node.js (no se usa en esta versión, pero está configurado)

Todo corre en un solo puerto (8080) durante desarrollo gracias a Vite.

---

## 2. TECNOLOGÍAS Y LENGUAJES UTILIZADOS

### **Frontend (Carpeta `client/`)**

#### **React 18**
- Es una librería de JavaScript que permite crear interfaces interactivas
- Funciona basado en **componentes reutilizables**
- Cada componente es como un bloque de construcción
- Ejemplo: El Header es un componente, el Dashboard es otro componente

#### **TypeScript**
- Es JavaScript pero con "tipos de datos"
- Básicamente, le dices al código qué tipo de dato esperas (número, texto, objeto)
- Evita errores antes de que sucedan
- Ejemplo: `valor: number` asegura que siempre sea un número

#### **TailwindCSS 3**
- Framework de CSS que proporciona "clases pre-hechas"
- En lugar de escribir CSS complejo, usas clases del sistema
- Ejemplo: `className="bg-terraflow-green text-white"` aplica estilos directamente

#### **Vite**
- Es el empaquetador y servidor de desarrollo
- Compila React y TypeScript a JavaScript que el navegador entiende
- Hace hot-reload (recarga automática cuando cambias código)

#### **Recharts**
- Librería para crear gráficas interactivas
- Usamos gráficas de barras, pasteles, etc.
- Lee datos de arrays JSON y dibuja automáticamente

#### **Lucide React**
- Biblioteca de iconos SVG
- Usamos iconos como nube, sol, viento, gotitas
- Son escalables y personalizables

### **Backend (Carpeta `server/`) - Configurado pero No Activo**

#### **Express.js**
- Framework Node.js para crear servidores y APIs
- Define rutas (URLs) que responden a solicitudes
- Aunque está configurado, no lo estamos usando activamente en esta versión

#### **Node.js**
- Es JavaScript corriendo en el servidor (no en el navegador)
- Permite usar JavaScript en el servidor

---

## 3. ESTRUCTURA DE CARPETAS

```
terraflow/
├── client/
│   ├── pages/              # Páginas principales (rutas)
│   │   ├── Dashboard.tsx   # Página principal con datos en tiempo real
│   │   ├── Analytics.tsx   # Página con gráficas
│   │   ├── Database.tsx    # Página con tabla de datos
│   │   └── NotFound.tsx    # Página 404
│   │
│   ├── components/
│   │   ├── Header.tsx      # Barra de navegación superior
│   │   ├── BackgroundBirds.tsx  # Pájaros decorativos en fondo
│   │   └── ui/             # Componentes reutilizables (botones, etc)
│   │
│   ├── data/
│   │   └── centinela-data.json  # Datos del sensor Centinela
│   │
│   ├── App.tsx             # Punto de entrada, configura rutas
│   └── global.css          # Estilos globales y temas de color
│
├── server/
│   ├── index.ts            # Configuración del servidor Express
│   └── routes/             # Endpoints de la API (no se usan aún)
│
├── tailwind.config.ts      # Configuración de TailwindCSS
├── vite.config.ts          # Configuración del empaquetador
└── package.json            # Dependencias del proyecto
```

---

## 4. FLUJO DE DATOS - CÓMO FUNCIONA TODO

### **Paso 1: El Usuario Abre la Página**

```
Usuario abre navegador → http://localhost:8080/
                    ↓
           Vite compila el código React
                    ↓
           Se carga el archivo App.tsx
```

### **Paso 2: App.tsx Renderiza la Estructura**

`App.tsx` es el punto de entrada que hace esto:

1. **Importa las dependencias necesarias**
   - React Router (para las rutas/navegación)
   - React Query (para manejar datos)
   - Componentes personalizados

2. **Configura las rutas:**
   ```
   / → Dashboard
   /analytics → Analytics
   /database → Database
   * (cualquier otra) → NotFound (404)
   ```

3. **Renderiza el HTML en el navegador**

### **Paso 3: El Usuario Navega a una Página**

Cuando hace click en "Análisis":

```
Usuario hace click en "/analytics"
           ↓
React Router detecta el cambio
           ↓
Carga el componente Analytics.tsx
           ↓
React re-renderiza la página (sin recargar)
           ↓
Se muestra la página de Análisis
```

---

## 5. CÓMO SE CARGAN LOS DATOS (CENTINELA)

### **Archivo de Datos: `client/data/centinela-data.json`**

Es un archivo JSON (como un Excel convertido a texto) con estructura:

```json
[
  {
    "Fecha_Hora": "2026-03-07 22:19:43",
    "Temperatura_C": 24.9,
    "Humedad_Aire_Pct": 61.09,
    "Luz_Lux": 28.85,
    "Gases_MQ135": 52.4,
    "Humedad_Suelo_Pct": 73
  },
  // ... más registros
]
```

### **Cómo se Usan en los Componentes**

#### **En Dashboard.tsx:**

```
1. Importa el archivo JSON:
   import centinelaData from "@/data/centinela-data.json"

2. Usa Hook useMemo para calcular estadísticas:
   - Calcula promedio de temperatura
   - Calcula promedio de humedad
   - Busca el último registro
   - Esto sucede UNA SOLA VEZ (no se recalcula cada render)

3. Transforma los datos en formato visual:
   - "52.4 Lux" → "Alto" (si es > 500 Lux)
   - "75 Gases" → "Buena" (si es < 60)
   - Crea objetos con etiquetas para las tarjetas

4. Renderiza las tarjetas con los valores calculados
```

#### **En Database.tsx:**

```
1. Importa centinelaData
2. Transforma CADA registro del array:
   - Convierte números a formato legible
   - Añade colores según el estado
   - Calcula estadísticas globales
3. Renderiza la tabla con los datos
```

#### **En Analytics.tsx:**

```
1. Toma los datos crudos del JSON
2. Los agrupa y categoriza:
   - Agrupa por cada 5 registros para gráfica de barras
   - Cuenta cuántos registros son "Óptimo", "Bueno", etc.
3. Crea arrays para Recharts:
   - barData = [{ name: "1", temperatura: 24.9, humedad: 61.09 }, ...]
   - pieData = [{ name: "Óptimo", value: 5 }, ...]
4. Recharts lee estos arrays y dibuja las gráficas automáticamente
```

---

## 6. COMPONENTES PRINCIPALES Y QUÉ HACEN

### **Header.tsx** - Navegación

```typescript
Funcionalidad:
├── Logo de Terraflow
├── Links de navegación (Panel de Control, Análisis, Base de Datos)
├── Usuario profile button
└── Menú móvil (aparece en pantallas pequeñas)

Estado (State):
└── mobileMenuOpen: boolean (¿está abierto el menú?)

Cuando hace click en un link:
└── React Router cambia la ruta sin recargar la página
```

### **Dashboard.tsx** - Página Principal

```typescript
Funcionalidad:
├── Muestra 4 tarjetas de sensores (Humedad, Sol, Calidad, Suelo)
├── Panel de recomendación (genera texto automático según datos)
└── Lista de "Datos en tiempo real" con indicadores

Datos que procesa:
├── Calcula promedio de cada sensor
├── Determina "nivel" según rangos:
│   ├── Temperatura: < 25°C "Óptimo"
│   ├── Humedad: > 50% "Buena"
│   └── Gases: < 80 "Buena"
└── Genera recomendación dinámica:
    └── Si humedad suelo < 65% → "Aumenta riego"
        Si humedad suelo > 75% → "Reduce riego"

Hooks usados:
└── useMemo: Calcula estadísticas una sola vez, no cada render
```

### **Analytics.tsx** - Gráficas

```typescript
Funcionalidad:
├── Gráfica 1: Barras (Temperatura y Humedad)
├── Gráfica 2: Pastel (Distribución de calidad)
└── Estadísticas resumidas en 4 cuadros

Cómo procesa datos:
├── Toma centinelaData (20 registros)
├── Agrupa cada 5 registros para las barras
├── Cuenta cuántos son "Óptimo", "Bueno", "Regular", "Alerta"
├── Calcula porcentajes: (cantidad / total) * 100
└── Recharts dibuja automáticamente

Recharts componentes:
├── <BarChart> - dibuja barras
├── <PieChart> - dibuja pastel
├── <Bar> - configura las barras
├── <Pie> - configura el pastel
└── <Tooltip> - muestra info al pasar mouse
```

### **Database.tsx** - Tabla de Datos

```typescript
Funcionalidad:
├── Tabla de 20 registros del Centinela
├── Columnas: Fecha, Humedad Aire, Temp, Luz Solar, Humedad Suelo
├── Estadísticas abajo: Total registros, promedios, registros buenos
└── Colores según estado (verde = bueno, naranja = alerta)

Procesamiento:
├── Mapea cada registro del JSON a una fila
├── Formatea números (2 decimales)
├── Calcula qué color mostrar según valor
└── Agrupa filas con colores alternados para legibilidad
```

### **BackgroundBirds.tsx** - Elementos Decorativos

```typescript
Funcionalidad:

├── Animaciones: bounce, pulse, fade
└── No son interactivos (pointer-events-none)

SVG (Scalable Vector Graphics):

├── Define formas: círculos, elipses, líneas
├── Resultados: imágenes que se escalan sin pixelarse
```

---

## 7. ESTILOS Y TEMAS (TailwindCSS)

### **Archivo: `client/global.css`**

Define variables CSS (valores reutilizables):

```css
:root {
  --background: 40 50% 95%;      /* Color de fondo crema */
  --primary: 98 30% 45%;         /* Verde Terraflow */
  /* ... más variables */
}
```

### **Archivo: `tailwind.config.ts`**

Extiende los colores de Tailwind:

```typescript
colors: {
  terraflow: {
    cream: "#F5F1E8",
    dark: "#5A6B4A",
    green: "#7A9856",
    orange: "#D97E3A",
    // ... más colores
  }
}
```

### **En los Componentes**

Usamos clases de Tailwind:

```jsx
<div className="bg-terraflow-green text-white px-6 py-4">
//          └─ fondo verde ────────────────────┘
//                                │
//                          texto blanco + padding
```

---

## 8. FLUJO DE INTERACTIVIDAD (Ejemplo: Click en Análisis)

```
1. Usuario ve navegación en Header.tsx
   └─ Componente Link a "/analytics"

2. Usuario hace click
   └─ React Router detecta el cambio de ruta

3. App.tsx ejecuta:
   └─ Ve que ruta es "/analytics"
   └─ Monta el componente Analytics.tsx

4. Analytics.tsx se renderiza:
   └─ Importa centinelaData
   └─ useMemo procesa datos
   └─ Crea barData y pieData
   └─ Recharts dibuja gráficas

5. Usuario ve la página de Análisis
   └─ Con gráficas y estadísticas

6. Si usuario pasa mouse sobre gráfica:
   └─ Tooltip de Recharts aparece
   └─ Muestra valores exactos
```

---

## 9. RESPONSIVIDAD (Cómo se adapta a celular)

### **En TailwindCSS:**

```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//              │                 │
//          1 columna en          3 columnas en
//          pantallas pequeñas    pantallas grandes (lg)
```

### **En Header:**

```jsx
<nav className="hidden md:flex">
//           │         │
//       Oculto en      Visible en
//       móvil          pantallas medianas
```

### **Breakpoints de Tailwind:**

```
sm: 640px   (tablets pequeñas)
md: 768px   (tablets)
lg: 1024px  (laptops)
xl: 1280px  (desktops)
2xl: 1536px (monitores grandes)
```

---

## 10. CICLO DE DESARROLLO (Lo que sucede cuando cambias código)

```
1. Editas un archivo (ejemplo: Dashboard.tsx)
   └─ Guardas el archivo (Ctrl+S)

2. Vite detecta el cambio
   └─ Recompila el archivo TypeScript a JavaScript
   └─ Inyecta el código nuevo en el navegador

3. React detecta que un componente cambió
   └─ Re-renderiza ese componente
   └─ Actualiza el DOM (la página)
   └─ El navegador muestra los cambios

4. TODO EN MILISEGUNDOS (hot reload)
```

---

## 11. FLUJO COMPLETO DE UN USUARIO USANDO LA APP

```
PASO 1: Abre navegador
        └─ http://localhost:8080

PASO 2: Se carga App.tsx
        └─ Configura rutas

PASO 3: Se renderiza Dashboard (ruta por defecto "/")
        ├─ Header se renderiza
        ├─ BackgroundBirds se renderiza
        └─ Dashboard importa centinelaData
            └─ Calcula estadísticas
            └─ Crea tarjetas de sensores
            └─ Renderiza todo en pantalla

PASO 4: Usuario ve Dashboard con:
        ├─ 4 tarjetas de sensores (valores reales del Centinela)
        ├─ Panel de recomendación (texto generado según datos)
        ├─ Lista de datos en tiempo real
        └─ Pájaros animados en fondo

PASO 5: Usuario hace click en "Análisis"
        ├─ React Router detecta cambio a "/analytics"
        ├─ App.tsx monta Analytics.tsx
        ├─ Analytics procesa centinelaData
        ├─ Crea arrays para gráficas
        ├─ Recharts dibuja gráficas
        └─ Usuario ve gráficas y estadísticas

PASO 6: Usuario hace click en "Base de Datos"
        ├─ Se monta Database.tsx
        ├─ Procesa cada registro del JSON
        ├─ Crea filas de tabla
        ├─ Calcula estadísticas
        └─ Usuario ve tabla con todos los registros
```

---

## 12. VENTAJAS DE ESTA ARQUITECTURA

### **React + TypeScript:**
- **Reutilizable**: Componentes se usan en múltiples lugares
- **Mantenible**: Código organizado y con tipos de datos
- **Rápido**: Solo renderiza lo que cambió
- **Escalable**: Fácil agregar más páginas/componentes

### **TailwindCSS:**
- **Rápido de escribir**: Clases cortas
- **Responsive**: Funciona en todos los tamaños
- **Consistente**: Un sistema de diseño para toda la app

### **Datos en JSON:**
- **Simple**: Sin base de datos complicada
- **Portátil**: Puedes compartir los datos fácilmente
- **Rápido**: Se carga al instante

---

## 13. CÓMO AGREGAR MÁS DATOS

Si tienes más datos del Centinela:

```
1. Convierte el Excel a JSON
2. Reemplaza el contenido de centinela-data.json
3. ¡Los gráficos y tablas se actualizan automáticamente!
   └─ useMemo recalcula estadísticas
   └─ Recharts redibuja gráficas
   └─ La tabla muestra nuevos registros
```

---

## 14. PRÓXIMOS PASOS POSIBLES

### **Para conectar una base de datos real:**
```
1. Instala driver de PostgreSQL/MySQL
2. Crea archivo server/db.ts con conexión
3. Crea endpoint en server/routes/
4. Cambia componentes para usar fetch():
   const data = await fetch('/api/sensor-data')
   const json = await data.json()
```

### **Para agregar autenticación:**
```
1. Usar librería como NextAuth o Auth0
2. Proteger rutas con componentes PrivateRoute
3. Guardar token en localStorage
```

### **Para desplegar:**
```
1. En Netlify: Conecta repo, auto-deploya
2. En Vercel: Igual que Netlify
3. En servidor propio: npm run build, copiar dist/
```

---

