import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models';
import { TaskService } from '../../core/services/task.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, TaskItemComponent, TaskFormComponent],
  template: `
    <div class="tasks-list">
      <div class="header">
        <div class="header-content">
          <div class="title-section">
            <h2>📝 Lista de Tareas</h2>
            <span class="total-badge">{{ totalTasks() }} Total</span>
          </div>
          <button class="btn-new-task" (click)="openCreateForm()">
            <span class="icon">➕</span>
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>

      <app-loading-spinner *ngIf="loading()"></app-loading-spinner>

      <div class="error" *ngIf="error()">
        {{ error() }}
      </div>

      <div class="kanban-board" *ngIf="!loading() && !error()">
        <div class="kanban-column planning"
             (dragover)="onDragOver($event)"
             (drop)="onDrop($event, 'Planificación')">
          <div class="column-header">
            <div class="header-left">
              <span class="icon">📋</span>
              <h3>Planificación</h3>
            </div>
            <span class="counter">{{ planningTasks().length }}</span>
          </div>
          <div class="column-content">
            <div *ngFor="let task of planningTasks()" 
                 class="draggable-wrapper"
                 draggable="true"
                 (dragstart)="onDragStart($event, task)">
              <app-task-item
                [task]="task"
                (edit)="openEditForm($event)"
                (delete)="deleteTask($event)">
              </app-task-item>
            </div>
            <div class="empty-column" *ngIf="planningTasks().length === 0">
              <p>Arrastra tareas aquí</p>
            </div>
          </div>
        </div>

        <div class="kanban-column in-progress"
             (dragover)="onDragOver($event)"
             (drop)="onDrop($event, 'En Progreso')">
          <div class="column-header">
            <div class="header-left">
              <span class="icon">🚀</span>
              <h3>En Progreso</h3>
            </div>
            <span class="counter">{{ inProgressTasks().length }}</span>
          </div>
          <div class="column-content">
            <div *ngFor="let task of inProgressTasks()" 
                 class="draggable-wrapper"
                 draggable="true"
                 (dragstart)="onDragStart($event, task)">
              <app-task-item
                [task]="task"
                (edit)="openEditForm($event)"
                (delete)="deleteTask($event)">
              </app-task-item>
            </div>
            <div class="empty-column" *ngIf="inProgressTasks().length === 0">
              <p>Arrastra tareas aquí</p>
            </div>
          </div>
        </div>

        <div class="kanban-column completed"
             (dragover)="onDragOver($event)"
             (drop)="onDrop($event, 'Completado')">
          <div class="column-header">
            <div class="header-left">
              <span class="icon">✅</span>
              <h3>Completado</h3>
            </div>
            <span class="counter">{{ completedTasks().length }}</span>
          </div>
          <div class="column-content">
            <div *ngFor="let task of completedTasks()" 
                 class="draggable-wrapper"
                 draggable="true"
                 (dragstart)="onDragStart($event, task)">
              <app-task-item
                [task]="task"
                (edit)="openEditForm($event)"
                (delete)="deleteTask($event)">
              </app-task-item>
            </div>
            <div class="empty-column" *ngIf="completedTasks().length === 0">
              <p>Arrastra tareas aquí</p>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="!loading() && !error() && tasks().length === 0">
        <div class="empty-icon">📋</div>
        <p>No hay tareas creadas</p>
        <button class="btn-create-first" (click)="openCreateForm()">
          <span class="icon">➕</span>
          <span>Crear Primera Tarea</span>
        </button>
      </div>

      <app-task-form
        *ngIf="showForm()"
        [task]="selectedTask()"
        (close)="closeForm()">
      </app-task-form>
    </div>
  `,
  styles: [`
    .tasks-list {
      padding: 2rem;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .header {
      margin-bottom: 2rem;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    h2 {
      margin: 0;
      color: #2d3748;
      font-size: 1.75rem;
      font-weight: 700;
    }

    .total-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .btn-new-task {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-new-task:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .btn-new-task .icon {
      font-size: 1.2rem;
    }

    .kanban-board {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      flex: 1;
      min-height: 0;
    }

    .kanban-column {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .kanban-column:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .column-header {
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-left .icon {
      font-size: 1.5rem;
    }

    .planning .column-header {
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border-bottom-color: #ff9800;
    }

    .in-progress .column-header {
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      border-bottom-color: #1976d2;
    }

    .completed .column-header {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-bottom-color: #4caf50;
    }

    .column-header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: #2d3748;
    }

    .counter {
      background: white;
      color: #2d3748;
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.875rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      min-width: 2rem;
      text-align: center;
    }

    .column-content {
      flex: 1;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 200px;
    }

    .draggable-wrapper {
      cursor: move;
      transition: all 0.2s ease;
    }

    .draggable-wrapper:hover {
      transform: scale(1.02);
    }

    .draggable-wrapper:active {
      opacity: 0.5;
      cursor: grabbing;
    }

    .empty-column {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 150px;
      border: 2px dashed #cbd5e0;
      border-radius: 12px;
      color: #a0aec0;
      background: rgba(247, 250, 252, 0.5);
    }

    .empty-column p {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .error {
      color: #e53e3e;
      padding: 1rem 1.5rem;
      background: rgba(254, 215, 215, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      margin-bottom: 1rem;
      border-left: 4px solid #e53e3e;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-state p {
      font-size: 1.25rem;
      color: #718096;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .btn-create-first {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-create-first:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .btn-create-first .icon {
      font-size: 1.2rem;
    }

    @media (max-width: 1024px) {
      .tasks-list {
        padding: 1rem;
      }

      .kanban-board {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .column-content {
        min-height: auto;
        max-height: 400px;
        overflow-y: auto;
      }
    }
  `]
})
export class TasksListComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  loading = this.taskService.loading;
  error = this.taskService.error;

  showForm = signal(false);
  selectedTask = signal<Task | undefined>(undefined);
  
  private draggedTask: Task | null = null;

  ngOnInit(): void {
    this.taskService.getTasks();
  }

  totalTasks = computed(() => this.tasks().length);

  planningTasks = computed(() =>
    this.tasks().filter(t => t.status.name === 'Planificación')
  );

  inProgressTasks = computed(() =>
    this.tasks().filter(t => t.status.name === 'En Progreso')
  );

  completedTasks = computed(() =>
    this.tasks().filter(t => t.status.name === 'Completado')
  );

  onDragStart(event: DragEvent, task: Task) {
    this.draggedTask = task;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', (event.target as HTMLElement).innerHTML);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, newStatusName: string) {
    event.preventDefault();
    
    if (!this.draggedTask) return;

    const statusMap: { [key: string]: { id: number, color: string } } = {
      'Planificación': { id: 1, color: '#ff9800' },
      'En Progreso': { id: 2, color: '#1976d2' },
      'Completado': { id: 3, color: '#4caf50' }
    };

    const newStatus = statusMap[newStatusName];
    
    if (this.draggedTask.status.id !== newStatus.id) {
      const updatedTask = {
        ...this.draggedTask,
        status: {
          id: newStatus.id,
          name: newStatusName,
          color: newStatus.color
        }
      };

      this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
        next: () => {
          this.taskService.getTasks();
        },
        error: (error) => {
          console.error('Error updating task status:', error);
        }
      });
    }

    this.draggedTask = null;
  }

  openCreateForm() {
    this.selectedTask.set(undefined);
    this.showForm.set(true);
  }

  openEditForm(task: Task) {
    this.selectedTask.set(task);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedTask.set(undefined);
    this.taskService.getTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}
