import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../../core/models';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ task ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
          <button class="close-btn" (click)="onCancel()">&times;</button>
        </div>

        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Título *</label>
            <input 
              id="title"
              type="text" 
              formControlName="title"
              placeholder="Ej: Implementar autenticación">
            <div class="error" *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
              El título es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="description">Descripción *</label>
            <textarea 
              id="description"
              formControlName="description"
              rows="3"
              placeholder="Describe la tarea..."></textarea>
            <div class="error" *ngIf="taskForm.get('description')?.invalid && taskForm.get('description')?.touched">
              La descripción es requerida
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="priority">Prioridad *</label>
              <select id="priority" formControlName="priority">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div class="form-group">
              <label for="status">Estado *</label>
              <select id="status" formControlName="status">
                <option value="1">En Progreso</option>
                <option value="2">Planificación</option>
                <option value="3">Completado</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="projectId">ID Proyecto *</label>
              <input 
                id="projectId"
                type="text" 
                formControlName="projectId"
                placeholder="1">
            </div>

            <div class="form-group">
              <label for="assignedTo">Asignado a *</label>
              <input 
                id="assignedTo"
                type="text" 
                formControlName="assignedTo"
                placeholder="ID del miembro">
            </div>
          </div>

          <div class="form-group">
            <label for="dueDate">Fecha Límite *</label>
            <input 
              id="dueDate"
              type="date" 
              formControlName="dueDate">
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!taskForm.valid || loading()">
              {{ loading() ? 'Guardando...' : (task ? 'Actualizar' : 'Crear') }}
            </button>
          </div>

          <div class="error" *ngIf="error()">
            {{ error() }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .modal-header h2 {
      margin: 0;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #333;
    }

    form {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #1976d2;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #1565c0;
    }

    .btn-secondary {
      background-color: #e0e0e0;
      color: #333;
    }

    .btn-secondary:hover {
      background-color: #d0d0d0;
    }

    .error {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `]
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  loading = this.taskService.loading;
  error = this.taskService.error;

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Media', Validators.required],
    status: ['1', Validators.required],
    projectId: ['', Validators.required],
    assignedTo: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        status: this.task.status.id,
        projectId: this.task.projectId,
        assignedTo: this.task.assignedTo,
        dueDate: this.formatDate(this.task.dueDate)
      });
    }
  }

  formatDate(date: Date | string): string {
    if (typeof date === 'string') return date.split('T')[0];
    return date.toISOString().split('T')[0];
  }

  getStatusObject(statusId: string) {
    const statuses = {
      '1': { id: '1', name: 'En Progreso', color: '#1976d2' },
      '2': { id: '2', name: 'Planificación', color: '#ff9800' },
      '3': { id: '3', name: 'Completado', color: '#4caf50' }
    };
    return statuses[statusId as keyof typeof statuses];
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Task = {
        id: this.task?.id || '',
        title: formValue.title,
        description: formValue.description,
        status: this.getStatusObject(formValue.status),
        priority: formValue.priority,
        assignedTo: formValue.assignedTo,
        projectId: formValue.projectId,
        dueDate: formValue.dueDate
      };

      if (this.task) {
        this.taskService.updateTask(this.task.id, taskData);
      } else {
        this.taskService.createTask(taskData);
      }

      setTimeout(() => {
        if (!this.error()) {
          this.close.emit();
        }
      }, 500);
    }
  }

  onCancel() {
    this.close.emit();
  }
}
