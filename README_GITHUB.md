# 📊 ProjectOps Dashboard

Dashboard moderno y completo para gestión de proyectos, tareas y equipos con funcionalidad de arrastrar y soltar.

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

### 🎯 Gestión de Proyectos
- **Tablero Kanban** con 3 estados: Planificación, En Progreso, Completado
- **Drag & Drop** para cambiar estados arrastrando tarjetas
- **CRUD completo**: Crear, editar, eliminar proyectos
- Visualización de fechas de inicio y fin
- Contadores por columna

### ✅ Gestión de Tareas
- **Tablero Kanban** con estados visuales
- **Drag & Drop** entre columnas
- **Prioridades coloreadas**: Alta (rojo), Media (amarillo), Baja (verde)
- Asignación a proyectos y miembros del equipo
- Fechas de vencimiento

### 👥 Gestión de Equipo
- Vista de tarjetas con avatares
- Estadísticas de proyectos y tareas asignadas
- Información de contacto
- CRUD completo de miembros

### 📈 Dashboard de Métricas
- Tarjetas con iconos y gradientes
- Métricas clave del proyecto
- Diseño moderno con animaciones

## 🎨 Diseño Moderno

- **Gradientes vibrantes** (púrpura/violeta)
- **Glassmorphism** (backdrop blur effects)
- **Sombras profundas** y elevaciones
- **Animaciones suaves** en hover y transiciones
- **Responsive design** para móviles y tablets
- **Iconos expresivos** para mejor UX

## 🚀 Tecnologías

- **Angular 21** (standalone components, signals)
- **TypeScript 5.6**
- **json-server** (simulación de API REST)
- **RxJS** (programación reactiva)
- **SCSS** (estilos avanzados)
- **HTML5 Drag & Drop API**

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/JoseMas68/Dashboard-ProjectOps.git

# Entrar al directorio
cd Dashboard-ProjectOps/projectops-dashboard

# Instalar dependencias
npm install

# Iniciar aplicación (cliente + servidor)
npm start
```

La aplicación se abrirá en `http://localhost:4200` y la API REST en `http://localhost:3000`.

## 📁 Estructura del Proyecto

```
projectops-dashboard/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/          # Modelos de datos
│   │   │   ├── services/        # Servicios HTTP
│   │   │   ├── guards/          # Guards de rutas
│   │   │   └── interceptors/    # Interceptores HTTP
│   │   ├── features/
│   │   │   ├── projects-board/  # Tablero de proyectos
│   │   │   ├── tasks-list/      # Lista de tareas
│   │   │   ├── team-overview/   # Vista de equipo
│   │   │   └── metrics-dashboard/ # Dashboard métricas
│   │   ├── layout/              # Componentes de layout
│   │   ├── shared/              # Componentes compartidos
│   │   └── app.routes.ts        # Rutas principales
│   └── assets/
│       └── data/
│           └── db.json          # Base de datos simulada
├── package.json
└── angular.json
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo (cliente + servidor)
npm start

# Solo cliente Angular
npm run start:client

# Solo servidor json-server
npm run start:server

# Build producción
npm run build

# Tests
npm test
```

## 🎮 Uso

### Arrastrar y Soltar
1. Haz clic en cualquier tarjeta de proyecto o tarea
2. Arrástrala a otra columna
3. El estado se actualiza automáticamente

### Crear Proyecto/Tarea
1. Clic en botón "Nuevo Proyecto" o "Nueva Tarea"
2. Completa el formulario modal
3. Guarda y aparecerá en la columna correspondiente

### Editar
1. Clic en el botón ✏️ de cualquier tarjeta
2. Modifica los datos
3. Guarda los cambios

### Eliminar
1. Clic en el botón 🗑️
2. Confirma la eliminación

## 📊 API REST (json-server)

La aplicación usa json-server que proporciona endpoints REST completos:

```
GET    /projects       # Listar proyectos
POST   /projects       # Crear proyecto
PUT    /projects/:id   # Actualizar proyecto
DELETE /projects/:id   # Eliminar proyecto

GET    /tasks          # Listar tareas
POST   /tasks          # Crear tarea
PUT    /tasks/:id      # Actualizar tarea
DELETE /tasks/:id      # Eliminar tarea

GET    /teamMembers    # Listar miembros
POST   /teamMembers    # Crear miembro
PUT    /teamMembers/:id # Actualizar miembro
DELETE /teamMembers/:id # Eliminar miembro

GET    /metrics        # Obtener métricas
```

## 🎯 Características Técnicas

### Signals (Angular 21)
- Estado reactivo con `signal()`
- Valores computados con `computed()`
- Mejor rendimiento y cambio de detección

### Standalone Components
- No requiere NgModules
- Imports directos en componentes
- Mejor tree-shaking

### Programación Reactiva
- RxJS Observables
- Manejo de estado con signals
- Subscripciones automáticas

### Drag & Drop Nativo
- HTML5 Drag & Drop API
- Sin librerías externas
- Feedback visual durante el arrastre

## 🛠️ Desarrollo

### Agregar Nueva Feature
```bash
ng generate component features/nueva-feature
```

### Agregar Servicio
```bash
ng generate service core/services/nuevo-servicio
```

### Agregar Modelo
```typescript
// src/app/core/models/nuevo-modelo.model.ts
export interface NuevoModelo {
  id: string;
  // propiedades...
}
```

## 📝 Datos de Ejemplo

El archivo `src/assets/data/db.json` contiene datos de ejemplo. Puedes modificarlo directamente o a través de la interfaz.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**JoseMas68**
- GitHub: [@JoseMas68](https://github.com/JoseMas68)

## 🙏 Agradecimientos

- Angular Team por el excelente framework
- json-server por la simulación de API
- Comunidad open source

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!
