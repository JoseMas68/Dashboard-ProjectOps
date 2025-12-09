import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../../../core/models';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="member-card">
      <div class="card-top">
        <div class="avatar">
          <img [src]="member.avatar" [alt]="member.name">
        </div>
        <div class="member-info">
          <h3>{{ member.name }}</h3>
          <p class="role">💼 {{ member.role }}</p>
          <p class="email">📧 {{ member.email }}</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">{{ member.assignedProjects.length }}</span>
          <span class="stat-label">📁 Proyectos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ member.assignedTasks.length }}</span>
          <span class="stat-label">✔️ Tareas</span>
        </div>
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
    .member-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .member-card:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px);
    }

    .card-top {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.25rem;
      align-items: flex-start;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      border: 3px solid #e2e8f0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .member-info {
      flex: 1;
      min-width: 0;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: #2d3748;
      font-size: 1.125rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .role {
      color: #667eea;
      font-weight: 600;
      margin: 0 0 0.375rem;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .email {
      color: #718096;
      font-size: 0.75rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-radius: 8px;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      flex: 1;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #718096;
      font-weight: 500;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: #cbd5e0;
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
export class MemberCardComponent {
  @Input({ required: true }) member!: TeamMember;
  @Output() edit = new EventEmitter<TeamMember>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.member);
  }

  onDelete() {
    if (confirm(`¿Estás seguro de eliminar a ${this.member.name}?`)) {
      this.delete.emit(this.member.id);
    }
  }
}
