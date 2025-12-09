import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private readonly apiUrl = `${environment.apiUrl}/metrics`;

  metrics = signal<any>({});
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getMetrics(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.metrics.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
