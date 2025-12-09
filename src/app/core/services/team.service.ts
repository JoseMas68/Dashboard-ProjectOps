import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamMember } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly apiUrl = `${environment.apiUrl}/teamMembers`;

  teamMembers = signal<TeamMember[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getTeamMembers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<TeamMember[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.teamMembers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  createTeamMember(member: TeamMember): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.post<TeamMember>(this.apiUrl, member).subscribe({
      next: (data) => {
        this.teamMembers.update(members => [...members, data]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  updateTeamMember(id: string, member: TeamMember): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.put<TeamMember>(`${this.apiUrl}/${id}`, member).subscribe({
      next: (data) => {
        this.teamMembers.update(members =>
          members.map(m => m.id === id ? data : m)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  deleteTeamMember(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.teamMembers.update(members =>
          members.filter(m => m.id !== id)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
