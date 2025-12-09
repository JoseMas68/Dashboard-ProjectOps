import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  projects = signal<Project[]>([]);
  selectedProject = signal<Project | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Project[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  getProjectById(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Project>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedProject.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  createProject(project: Project): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.post<Project>(this.apiUrl, project).subscribe({
      next: (data) => {
        this.projects.update(projects => [...projects, data]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  updateProject(id: string, project: Project): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.put<Project>(`${this.apiUrl}/${id}`, project).subscribe({
      next: (data) => {
        this.projects.update(projects =>
          projects.map(p => p.id === id ? data : p)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  deleteProject(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.projects.update(projects =>
          projects.filter(p => p.id !== id)
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
