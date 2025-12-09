import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  tasks = signal<Task[]>([]);
  selectedTask = signal<Task | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  getTaskById(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Task>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedTask.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  createTask(task: Task): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.post<Task>(this.apiUrl, task).subscribe({
      next: (data) => {
        this.tasks.update(tasks => [...tasks, data]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  updateTask(id: string, task: Task): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.put<Task>(`${this.apiUrl}/${id}`, task).subscribe({
      next: (data) => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === id ? data : t)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  deleteTask(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.filter(t => t.id !== id)
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
