# React Native Librerías Recomendadas

Este proyecto es un catálogo interactivo de librerías populares para React Native que todo programador debe conocer, está diseñada para mostrar ejemplos prácticos y minimalistas de su uso.

## 📱 Funcionalidades

- Muestra un listado de librerías populares para React Native
- Cada librería tiene su propia pantalla de demostración con ejemplos prácticos
- Diseño moderno y atractivo con animaciones utilizando react-native-reanimated y Skia
- Interfaces de usuario optimizadas siguiendo las mejores prácticas

## 🔍 Librerías incluidas

- **lottie-react-native**: Animaciones Adobe After Effects
- **react-native-toast-message**: Notificaciones toast elegantes
- **react-native-calendar**: Componentes de calendario
- **react-native-bottom-modal**: Modales desde la parte inferior
- **@shopify/flash-list**: Listas optimizadas para rendimiento
- **victory-native-xl**: Visualización de datos y gráficos
- **react-content-loader**: Esqueletos de carga animados
- **expo-linear-gradient**: Degradados lineales
- **react-native-purchases**: Integración con RevenueCat para compras
- **react-native-highlighter**: Resaltado de sintaxis de código

## 🚀 Primeros pasos

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI instalado globalmente

### Instalación

```bash
# Clonar el repositorio
git clone <URL-del-repositorio>
```

```bash
# Navegar al directorio
cd rn-packages-recommended
```

```bash
# Instalar dependencias
npm install --legacy-peer-deps
# o
yarn install
```

```bash
# Iniciar la aplicación
npx expo start
```

## 🧱 Estructura del proyecto

```
/
├── app/                    # Pantallas y navegación (expo-router)
│   ├── _layout.tsx         # Configuración de rutas
│   ├── index.tsx           # Pantalla principal
│   ├── library/            # Pantallas de librerías específicas
│   └── examples/           # Ejemplos de implementación
├── components/             # Componentes reutilizables
│   └── ui/                 # Componentes de UI
├── constants/              # Constantes utilizadas en la app
├── themes/                 # Configuración de temas
└── assets/                 # Imágenes, fuentes y archivos estáticos
```

## 🛠️ Tecnologías utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma para construir apps React Native
- **TypeScript**: Tipado estático para JavaScript
- **expo-router**: Sistema de navegación tipo metro
- **react-native-reanimated**: Motor de animaciones avanzado
- **@shopify/react-native-skia**: Renderizado de gráficos de alto rendimiento

## 📝 Notas

Cada ejemplo está diseñado para ser claro y minimalista, ideal para desarrolladores que quieren empezar a utilizar estas librerías en sus proyectos.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT 