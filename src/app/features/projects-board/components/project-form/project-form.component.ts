import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../../core/models';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ project ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
          <button class="close-btn" (click)="onCancel()">&times;</button>
        </div>

        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Nombre del Proyecto *</label>
            <input 
              id="name"
              type="text" 
              formControlName="name"
              placeholder="Ej: Rediseño de Sitio Web">
            <div class="error" *ngIf="projectForm.get('name')?.invalid && projectForm.get('name')?.touched">
              El nombre es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="description">Descripción *</label>
            <textarea 
              id="description"
              formControlName="description"
              rows="3"
              placeholder="Describe el proyecto..."></textarea>
            <div class="error" *ngIf="projectForm.get('description')?.invalid && projectForm.get('description')?.touched">
              La descripción es requerida
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="startDate">Fecha Inicio *</label>
              <input 
                id="startDate"
                type="date" 
                formControlName="startDate">
            </div>

            <div class="form-group">
              <label for="endDate">Fecha Fin *</label>
              <input 
                id="endDate"
                type="date" 
                formControlName="endDate">
            </div>
          </div>

          <div class="form-group">
            <label for="status">Estado *</label>
            <select id="status" formControlName="status">
              <option value="1">En Progreso</option>
              <option value="2">Planificación</option>
              <option value="3">Completado</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!projectForm.valid || loading()">
              {{ loading() ? 'Guardando...' : (project ? 'Actualizar' : 'Crear') }}
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
export class ProjectFormComponent implements OnInit {
  @Input() project?: Project;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);

  loading = this.projectService.loading;
  error = this.projectService.error;

  projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    status: ['1', Validators.required]
  });

  ngOnInit() {
    if (this.project) {
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description,
        startDate: this.formatDate(this.project.startDate),
        endDate: this.formatDate(this.project.endDate),
        status: this.project.status.id
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
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const projectData: Project = {
        id: this.project?.id || '',
        name: formValue.name,
        description: formValue.description,
        status: this.getStatusObject(formValue.status),
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        teamMembers: this.project?.teamMembers || [],
        tasks: this.project?.tasks || []
      };

      if (this.project) {
        this.projectService.updateProject(this.project.id, projectData);
      } else {
        this.projectService.createProject(projectData);
      }

      // Esperar un momento y cerrar
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
