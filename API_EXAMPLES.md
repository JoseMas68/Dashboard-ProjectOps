# Ejemplos de Uso de la API

Este documento muestra ejemplos de cómo usar los servicios para interactuar con la base de datos JSON.

## ProjectService

### Obtener todos los proyectos

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from './core/services/project.service';

export class MyComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  // Acceder a los datos
  projects = this.projectService.projects;
  loading = this.projectService.loading;
  error = this.projectService.error;

  ngOnInit() {
    // Cargar proyectos
    this.projectService.getProjects();
  }
}
```

### Crear un nuevo proyecto

```typescript
createNewProject() {
  const newProject = {
    id: '', // El servidor asignará un ID
    name: 'Nuevo Proyecto',
    description: 'Descripción del proyecto',
    status: { id: '1', name: 'En Progreso', color: '#1976d2' },
    startDate: '2024-12-09',
    endDate: '2025-03-09',
    teamMembers: ['1', '2'],
    tasks: []
  };

  this.projectService.createProject(newProject);
}
```

### Actualizar un proyecto

```typescript
updateExistingProject(projectId: string) {
  const updatedProject = {
    ...this.projectService.projects().find(p => p.id === projectId),
    name: 'Nombre Actualizado',
    description: 'Nueva descripción'
  };

  this.projectService.updateProject(projectId, updatedProject);
}
```

### Eliminar un proyecto

```typescript
deleteProject(projectId: string) {
  this.projectService.deleteProject(projectId);
}
```

### Obtener un proyecto específico

```typescript
getProjectDetails(projectId: string) {
  this.projectService.getProjectById(projectId);
  
  // El proyecto seleccionado estará disponible en:
  const selectedProject = this.projectService.selectedProject();
}
```

## TaskService

### Obtener todas las tareas

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from './core/services/task.service';

export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  
  tasks = this.taskService.tasks;
  loading = this.taskService.loading;

  ngOnInit() {
    this.taskService.getTasks();
  }
}
```

### Crear una nueva tarea

```typescript
addNewTask() {
  const newTask = {
    id: '',
    title: 'Nueva Tarea',
    description: 'Descripción de la tarea',
    status: { id: '2', name: 'Planificación', color: '#ff9800' },
    priority: 'Alta',
    assignedTo: '1',
    projectId: '1',
    dueDate: '2024-12-20'
  };

  this.taskService.createTask(newTask);
}
```

### Actualizar una tarea

```typescript
markTaskAsCompleted(taskId: string) {
  const task = this.taskService.tasks().find(t => t.id === taskId);
  
  if (task) {
    const updatedTask = {
      ...task,
      status: { id: '3', name: 'Completado', color: '#4caf50' }
    };

    this.taskService.updateTask(taskId, updatedTask);
  }
}
```

### Eliminar una tarea

```typescript
removeTask(taskId: string) {
  this.taskService.deleteTask(taskId);
}
```

## TeamService

### Obtener miembros del equipo

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { TeamService } from './core/services/team.service';

export class TeamComponent implements OnInit {
  private teamService = inject(TeamService);
  
  members = this.teamService.teamMembers;

  ngOnInit() {
    this.teamService.getTeamMembers();
  }
}
```

## MetricsService

### Obtener métricas

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { MetricsService } from './core/services/metrics.service';

export class DashboardComponent implements OnInit {
  private metricsService = inject(MetricsService);
  
  metrics = this.metricsService.metrics;

  ngOnInit() {
    this.metricsService.getMetrics();
  }
  
  // Usar las métricas en el template
  getTotalProjects() {
    return this.metrics().totalProjects;
  }
}
```

## Uso con Signals (Reactivo)

Los servicios usan Angular Signals, lo que permite reactividad automática:

```typescript
export class MyComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  // Los signals se actualizan automáticamente
  projects = this.projectService.projects;
  
  // Computed signals para transformaciones
  activeProjects = computed(() => 
    this.projects().filter(p => p.status.name === 'En Progreso')
  );
  
  // Effect para reaccionar a cambios
  constructor() {
    effect(() => {
      const projects = this.projects();
      console.log(`Hay ${projects.length} proyectos`);
    });
  }
}
```

## Manejo de Estados

Todos los servicios tienen signals para estados comunes:

```typescript
// En el template
<div *ngIf="loading()">
  <app-loading-spinner></app-loading-spinner>
</div>

<div *ngIf="error()">
  <p class="error">{{ error() }}</p>
</div>

<div *ngIf="!loading() && !error()">
  <!-- Contenido -->
</div>
```

## Ejemplo Completo: Componente de Formulario

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './core/services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nombre del proyecto">
      <textarea formControlName="description" placeholder="Descripción"></textarea>
      
      <button type="submit" [disabled]="!projectForm.valid || loading()">
        {{ loading() ? 'Guardando...' : 'Crear Proyecto' }}
      </button>
      
      <div *ngIf="error()" class="error">{{ error() }}</div>
    </form>
  `
})
export class ProjectFormComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  
  loading = this.projectService.loading;
  error = this.projectService.error;
  
  projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject = {
        id: '',
        ...this.projectForm.value,
        status: { id: '1', name: 'En Progreso', color: '#1976d2' },
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        teamMembers: [],
        tasks: []
      };

      this.projectService.createProject(newProject);
      
      // Opcional: limpiar el formulario
      this.projectForm.reset();
    }
  }
}
```

## Filtrado y Búsqueda con json-server

json-server soporta filtrado automático:

```typescript
// Modificar el servicio para aceptar parámetros
getTasks(projectId?: string): void {
  let url = this.apiUrl;
  
  if (projectId) {
    url += `?projectId=${projectId}`;
  }
  
  this.http.get<Task[]>(url).subscribe({...});
}

// Uso
this.taskService.getTasks('1'); // Solo tareas del proyecto 1
```

## Paginación

```typescript
getProjects(page: number = 1, limit: number = 10): void {
  const url = `${this.apiUrl}?_page=${page}&_limit=${limit}`;
  
  this.http.get<Project[]>(url).subscribe({...});
}
```

## Ordenamiento

```typescript
// Ordenar por nombre ascendente
getProjects(): void {
  const url = `${this.apiUrl}?_sort=name&_order=asc`;
  
  this.http.get<Project[]>(url).subscribe({...});
}
```

## Búsqueda

```typescript
searchProjects(query: string): void {
  const url = `${this.apiUrl}?q=${query}`;
  
  this.http.get<Project[]>(url).subscribe({...});
}
```
