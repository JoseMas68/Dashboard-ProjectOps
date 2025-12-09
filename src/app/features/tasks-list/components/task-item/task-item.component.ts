import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  template: `
    <div class="task-card">
      <div class="card-header">
        <h3>{{ task.title }}</h3>
        <span class="status-badge" [style.background-color]="task.status.color">
          {{ task.status.name }}
        </span>
      </div>
      <p class="description">{{ task.description }}</p>
      <div class="task-meta">
        <span class="priority" [class.high]="task.priority === 'Alta'" 
                             [class.medium]="task.priority === 'Media'"
                             [class.low]="task.priority === 'Baja'">
          {{ getPriorityIcon(task.priority) }} {{ task.priority }}
        </span>
        <span class="due-date">⏰ {{ task.dueDate | dateFormat }}</span>
      </div>
      <div class="actions">
        <button class="btn-action btn-edit" (click)="onEdit()" title="Editar">
          <span>✏️</span>
        </button>
        <button class="btn-action btn-delete" (click)="onDelete()" title="Eliminar">
          <span>🗑️</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .task-card {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .task-card:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 0.75rem;
    }

    h3 {
      margin: 0;
      font-size: 1.125rem;
      color: #2d3748;
      font-weight: 700;
      line-height: 1.4;
      flex: 1;
    }

    .status-badge {
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.75rem;
      color: white;
      font-weight: 600;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .description {
      color: #718096;
      font-size: 0.875rem;
      margin: 0 0 1rem 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .task-meta {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid #e2e8f0;
    }

    .priority {
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .priority.high {
      background: linear-gradient(135deg, #fee 0%, #fcc 100%);
      color: #c53030;
    }

    .priority.medium {
      background: linear-gradient(135deg, #fef5e7 0%, #fdeaa8 100%);
      color: #d69e2e;
    }

    .priority.low {
      background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
      color: #319795;
    }

    .due-date {
      font-size: 0.75rem;
      color: #a0aec0;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .btn-action {
      flex: 1;
      padding: 0.625rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.25rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-action span {
      display: block;
      transition: transform 0.2s ease;
    }

    .btn-action:hover span {
      transform: scale(1.2);
    }

    .btn-edit {
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    }

    .btn-edit:hover {
      background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    }

    .btn-delete {
      background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    }

    .btn-delete:hover {
      background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
    }
  `]
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    if (confirm(`¿Estás seguro de eliminar la tarea "${this.task.title}"?`)) {
      this.delete.emit(this.task.id);
    }
  }

  getPriorityIcon(priority: string): string {
    const icons: { [key: string]: string } = {
      'Alta': '🔴',
      'Media': '🟡',
      'Baja': '🟢'
    };
    return icons[priority] || '⚪';
  }
}
