# ProjectOps Dashboard

Dashboard de gestión de proyectos, tareas y equipo construido con Angular.

## Características

- 📊 Dashboard de métricas en tiempo real
- 📁 Gestión de proyectos
- ✅ Lista de tareas
- 👥 Vista de equipo
- 💾 Base de datos JSON editable con json-server

## Instalación

```bash
npm install
```

## Ejecutar el Proyecto

El proyecto utiliza **json-server** para simular una API REST con datos persistentes.

### Opción 1: Ejecutar todo junto (Recomendado)

```bash
npm start
```

Este comando ejecutará simultáneamente:
- Angular en `http://localhost:4200`
- JSON Server en `http://localhost:3000`

### Opción 2: Ejecutar por separado

**Terminal 1 - JSON Server:**
```bash
npm run start:server
```

**Terminal 2 - Angular:**
```bash
npm run start:client
```

## Endpoints de la API

La API REST está disponible en `http://localhost:3000` con los siguientes endpoints:

- `GET /projects` - Obtener todos los proyectos
- `GET /projects/:id` - Obtener un proyecto específico
- `POST /projects` - Crear un nuevo proyecto
- `PUT /projects/:id` - Actualizar un proyecto
- `DELETE /projects/:id` - Eliminar un proyecto

- `GET /tasks` - Obtener todas las tareas
- `GET /tasks/:id` - Obtener una tarea específica
- `POST /tasks` - Crear una nueva tarea
- `PUT /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

- `GET /teamMembers` - Obtener todos los miembros del equipo
- `GET /teamMembers/:id` - Obtener un miembro específico
- `POST /teamMembers` - Agregar un nuevo miembro
- `PUT /teamMembers/:id` - Actualizar un miembro
- `DELETE /teamMembers/:id` - Eliminar un miembro

- `GET /metrics` - Obtener métricas del dashboard

## Editar los Datos

Los datos se almacenan en el archivo `src/assets/data/db.json`. Puedes editarlo directamente o usar las operaciones CRUD a través de la API.

**json-server** guarda automáticamente los cambios realizados mediante la API en el archivo JSON.

### Ejemplo: Agregar un proyecto con curl

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Proyecto",
    "description": "Descripción del proyecto",
    "status": {"id": "1", "name": "En Progreso", "color": "#1976d2"},
    "startDate": "2024-12-09",
    "endDate": "2025-03-09",
    "teamMembers": [],
    "tasks": []
  }'
```

### Ejemplo: Actualizar una tarea

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "title": "Tarea actualizada",
    "description": "Nueva descripción",
    "status": {"id": "3", "name": "Completado", "color": "#4caf50"},
    "priority": "Alta",
    "assignedTo": "1",
    "projectId": "1",
    "dueDate": "2024-12-15"
  }'
```

### Ejemplo: Eliminar un proyecto

```bash
curl -X DELETE http://localhost:3000/projects/5
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Guards de autenticación
│   │   ├── interceptors/    # Interceptores HTTP
│   │   ├── models/          # Modelos de datos
│   │   └── services/        # Servicios de API
│   ├── features/
│   │   ├── metrics-dashboard/    # Dashboard de métricas
│   │   ├── projects-board/       # Tablero de proyectos
│   │   ├── tasks-list/           # Lista de tareas
│   │   └── team-overview/        # Vista del equipo
│   ├── layout/              # Componentes de layout
│   └── shared/              # Componentes compartidos
├── assets/
│   └── data/
│       └── db.json         # Base de datos JSON
└── environments/           # Configuraciones de entorno
```

## Tecnologías

- **Angular 21** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **json-server** - API REST simulada
- **Signals** - Sistema de reactividad de Angular

## Scripts Disponibles

- `npm start` - Ejecuta Angular y json-server simultáneamente
- `npm run start:client` - Solo ejecuta Angular
- `npm run start:server` - Solo ejecuta json-server
- `npm run build` - Construye el proyecto para producción
- `npm run watch` - Construye en modo watch
- `npm test` - Ejecuta las pruebas

## Notas Importantes

1. **Persistencia de datos**: Todos los cambios realizados mediante la API se guardan automáticamente en `db.json`
2. **Puerto del servidor**: json-server usa el puerto 3000 por defecto
3. **CORS**: json-server permite CORS por defecto, facilitando las peticiones desde Angular
4. **Delay**: Hay un delay de 500ms configurado para simular latencia de red real
