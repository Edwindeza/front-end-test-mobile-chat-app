# Chat App - Frontend Test Mobile

Modificar y mejorar aplicación de chat móvil desarrollada con React Native, Expo y TypeScript.

## 📁 Arquitectura del Proyecto

### Arquitectura basada en artefactos por módulos

- **Mejora**: Refactoricé la estructura existente para mejor organización
- **Patrones aplicados**:
  - Separación Components vs Containers
  - Hooks personalizados para lógica reutilizable
  - Stores separados por módulo con Zustand
  - Arquitectura basada en artefactos en cada módulo

#### Estructura

```
src/
├── modules/
│   ├── chat/           # Módulo de chat
│   ├── user/           # Módulo de usuarios
│   ├── profile/        # Módulo de perfil
│   └── media/          # Módulo de medios
├── shared/
│   ├── components/     # Componentes reutilizables
│   ├── hooks/          # Hooks personalizados
│   ├── stores/         # Stores de Zustand
│   ├── database/       # Configuración de BD
│   └── utils/          # Utilidades
└── app/                # Pantallas de Expo Router
```

### Principios de Diseño

1. **Separación por módulos**: Cada funcionalidad está encapsulada en su propio módulo y con sus respectivos artefactos
2. **Componentes vs Containers**: Separación clara entre lógica de presentación y lógica de negocio en la mayoría de componentes
3. **Hooks personalizados**: Lógica reutilizable extraída a hooks
4. **Stores centralizados**: Estado global manejado con Zustand pero a la vez modular lo que permite realizar facilmente el mantenimiento
5. **Aliases de importación**: Uso de `@/` para imports más limpios

### Tests Implementados

1. **HelloWave Component** - Animación de saludo
2. **useAuthStore** - Store de autenticación
3. **chatUtils & timeUtils** - Utilidades de formato
4. **Splash Screen** - Pantalla de carga personalizada
5. **LoginContainer** - Contenedor de login

## Mejoras Implementadas

### 1. **Splash Screen Personalizado**

- **Mejora**: Reemplazé el splash screen nativo con componente personalizado
- **Implementación**:
  - Uso del componente HelloWave que me dejaron
  - Configuración nativa deshabilitada (`hideAsync: true`)
- **Beneficio**: Mejor control de UX y branding personalizable

### 2. **Sistema de Testing **

- **Mejora**: Implementé algunos test como ejemplos de cada aspecto + React Native Testing Library

- **Tests creados**:
  - HelloWave Component (3 tests)
  - useAuthStore (3 tests)
  - chatUtils & timeUtils (12 tests)
  - Splash Screen (2 tests)
  - LoginContainer (2 tests)
- **Configuración**:
  - Mocks para módulos de Expo
  - Aliases de importación (@/) configurados
  - Setup optimizado para React Native

### 3. **Optimizaciones de Rendimiento**

- **Mejora**: Aplicé useMemo y useCallback estratégicamente
- **Criterios aplicados**:
  - **useMemo**: Cálculos costosos, valores derivados, arrays grandes
  - **useCallback**: Funciones pasadas como props, contexto, async complejas
- **Casos específicos**:
  - `ChatListItem`: Filtrado de participantes, formateo de tiempo
  - `useSearchModal`: Filtrado de mensajes por query
  - `Toast`: Funciones de contexto estables
  - `useChatsDb`: Operaciones async de BD
- **Paginacion**:
  - `useChatsPagination`: Para gestionar paginacion de los chats y facilitar la carga inicial sin tanto render (esto puede mejorarse en base a los casos de uso definidos, como cargar de un api, ir acumulando en BD hasta cierto grado de mensajes, etc.)

### 4. Pasos para correr el proyecto

```bash
# Instalación
npm install

# Si hay problemas con peer dependencies
npm install --legacy-peer-deps

# Ejecutar migraciones de base de datos
npm run migrate

# Desarrollo
npm start

# Testing
npm test
```

---

# Chat App - Frontend Test Mobile

Modify and improve mobile chat application developed with React Native, Expo and TypeScript.

## Project Architecture

### Artifact-based modular architecture

- **Improvement**: Refactored existing structure for better organization
- **Applied patterns**:
  - Components vs Containers separation
  - Custom hooks for reusable logic
  - Separate stores per module with Zustand
  - Artifact-based architecture in each module

#### Structure

```
src/
├── modules/
│   ├── chat/           # Chat module
│   ├── user/           # User module
│   ├── profile/        # Profile module
│   └── media/          # Media module
├── shared/
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── stores/         # Zustand stores
│   ├── database/       # Database configuration
│   └── utils/          # Utilities
└── app/                # Expo Router screens
```

### Design Principles

1. **Module separation**: Each functionality is encapsulated in its own module with its respective artifacts
2. **Components vs Containers**: Clear separation between presentation logic and business logic in most components
3. **Custom hooks**: Reusable logic extracted to hooks
4. **Centralized stores**: Global state managed with Zustand but modular for easy maintenance
5. **Import aliases**: Use of `@/` for cleaner imports

### Implemented Tests

1. **HelloWave Component** - Greeting animation
2. **useAuthStore** - Authentication store
3. **chatUtils & timeUtils** - Format utilities
4. **Splash Screen** - Custom loading screen
5. **LoginContainer** - Login container

## Implemented Improvements

### 1. **Custom Splash Screen**

- **Improvement**: Replaced native splash screen with custom component
- **Implementation**:
  - Use of the HelloWave component provided
  - Native configuration disabled (`hideAsync: true`)
- **Benefit**: Better UX control and customizable branding

### 2. **Testing System**

- **Improvement**: Implemented some tests as examples for each aspect + React Native Testing Library

- **Created tests**:
  - HelloWave Component (3 tests)
  - useAuthStore (3 tests)
  - chatUtils & timeUtils (12 tests)
  - Splash Screen (2 tests)
  - LoginContainer (2 tests)
- **Configuration**:
  - Mocks for Expo modules
  - Import aliases (@/) configured
  - Optimized setup for React Native

### 3. **Performance Optimizations**

- **Improvement**: Applied useMemo and useCallback strategically
- **Applied criteria**:
  - **useMemo**: Expensive calculations, derived values, large arrays
  - **useCallback**: Functions passed as props, context, complex async
- **Specific cases**:
  - `ChatListItem`: Participant filtering, time formatting
  - `useSearchModal`: Message filtering by query
  - `Toast`: Stable context functions
  - `useChatsDb`: Async database operations
- **Pagination**:
  - `useChatsPagination`: To manage chat pagination and facilitate initial loading without too much rendering (this can be improved based on defined use cases, such as loading from an API, accumulating in DB up to a certain degree of messages, etc.)

### 4. Steps to run the project

```bash
# Installation
npm install

# If there are peer dependency issues
npm install --legacy-peer-deps

# Run database migrations
npm run migrate

# Development
npm start

# Testing
npm test
```
