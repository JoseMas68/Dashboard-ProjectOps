import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamMember } from '../../../../core/models';
import { TeamService } from '../../../../core/services/team.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ member ? 'Editar Miembro' : 'Nuevo Miembro' }}</h2>
          <button class="close-btn" (click)="onCancel()">&times;</button>
        </div>

        <form [formGroup]="memberForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Nombre Completo *</label>
            <input 
              id="name"
              type="text" 
              formControlName="name"
              placeholder="Ej: María González">
            <div class="error" *ngIf="memberForm.get('name')?.invalid && memberForm.get('name')?.touched">
              El nombre es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              placeholder="ejemplo@projectops.com">
            <div class="error" *ngIf="memberForm.get('email')?.invalid && memberForm.get('email')?.touched">
              El email es requerido y debe ser válido
            </div>
          </div>

          <div class="form-group">
            <label for="role">Rol *</label>
            <input 
              id="role"
              type="text" 
              formControlName="role"
              placeholder="Ej: Frontend Developer">
            <div class="error" *ngIf="memberForm.get('role')?.invalid && memberForm.get('role')?.touched">
              El rol es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="avatar">URL Avatar</label>
            <input 
              id="avatar"
              type="url" 
              formControlName="avatar"
              placeholder="https://example.com/avatar.jpg">
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!memberForm.valid || loading()">
              {{ loading() ? 'Guardando...' : (member ? 'Actualizar' : 'Crear') }}
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
      max-width: 500px;
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

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }

    input:focus {
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
export class MemberDetailComponent implements OnInit {
  @Input() member?: TeamMember;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamService = inject(TeamService);

  loading = this.teamService.loading;
  error = this.teamService.error;

  memberForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    avatar: ['https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)]
  });

  ngOnInit() {
    if (this.member) {
      this.memberForm.patchValue({
        name: this.member.name,
        email: this.member.email,
        role: this.member.role,
        avatar: this.member.avatar
      });
    }
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.value;
      const memberData: TeamMember = {
        id: this.member?.id || '',
        name: formValue.name,
        email: formValue.email,
        role: formValue.role,
        avatar: formValue.avatar,
        assignedProjects: this.member?.assignedProjects || [],
        assignedTasks: this.member?.assignedTasks || []
      };

      if (this.member) {
        this.teamService.updateTeamMember(this.member.id, memberData);
      } else {
        this.teamService.createTeamMember(memberData);
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
