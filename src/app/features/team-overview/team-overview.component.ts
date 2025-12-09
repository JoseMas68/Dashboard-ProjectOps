import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../core/models';
import { TeamService } from '../../core/services/team.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

@Component({
  selector: 'app-team-overview',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, MemberCardComponent, MemberDetailComponent],
  template: `
    <div class="team-overview">
      <div class="header">
        <div class="header-content">
          <div class="title-section">
            <h2>👥 Equipo</h2>
            <span class="total-badge">{{ teamMembers().length }} Miembros</span>
          </div>
          <button class="btn-new-member" (click)="openCreateForm()">
            <span class="icon">➕</span>
            <span>Nuevo Miembro</span>
          </button>
        </div>
      </div>

      <app-loading-spinner *ngIf="loading()"></app-loading-spinner>

      <div class="error" *ngIf="error()">
        {{ error() }}
      </div>

      <div class="team-grid" *ngIf="!loading() && !error() && teamMembers().length > 0">
        <app-member-card
          *ngFor="let member of teamMembers()"
          [member]="member"
          (edit)="openEditForm($event)"
          (delete)="deleteMember($event)">
        </app-member-card>
      </div>

      <div class="empty-state" *ngIf="!loading() && !error() && teamMembers().length === 0">
        <div class="empty-icon">👥</div>
        <p>No hay miembros en el equipo</p>
        <button class="btn-create-first" (click)="openCreateForm()">
          <span class="icon">➕</span>
          <span>Agregar Primer Miembro</span>
        </button>
      </div>

      <app-member-detail
        *ngIf="showForm()"
        [member]="selectedMember()"
        (close)="closeForm()">
      </app-member-detail>
    </div>
  `,
  styles: [`
    .team-overview {
      padding: 2rem;
      min-height: 100vh;
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

    .btn-new-member {
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

    .btn-new-member:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .btn-new-member .icon {
      font-size: 1.2rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
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
      margin: 0 0 1.5rem 0;
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

    @media (max-width: 768px) {
      .team-overview {
        padding: 1rem;
      }

      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TeamOverviewComponent implements OnInit {
  private teamService = inject(TeamService);

  teamMembers = this.teamService.teamMembers;
  loading = this.teamService.loading;
  error = this.teamService.error;

  showForm = signal(false);
  selectedMember = signal<TeamMember | undefined>(undefined);

  ngOnInit(): void {
    this.teamService.getTeamMembers();
  }

  openCreateForm() {
    this.selectedMember.set(undefined);
    this.showForm.set(true);
  }

  openEditForm(member: TeamMember) {
    this.selectedMember.set(member);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedMember.set(undefined);
    this.teamService.getTeamMembers();
  }

  deleteMember(memberId: string) {
    this.teamService.deleteTeamMember(memberId);
  }
}
