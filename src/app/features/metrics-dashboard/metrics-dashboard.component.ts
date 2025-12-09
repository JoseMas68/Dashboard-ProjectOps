import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsService } from '../../core/services/metrics.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';

@Component({
  selector: 'app-metrics-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, MetricCardComponent],
  template: `
    <div class="metrics-dashboard">
      <div class="header">
        <div class="header-content">
          <h2>📊 Dashboard de Métricas</h2>
        </div>
      </div>

      <app-loading-spinner *ngIf="loading()"></app-loading-spinner>

      <div class="error" *ngIf="error()">
        {{ error() }}
      </div>

      <div class="metrics-grid" *ngIf="!loading() && !error()">
        <app-metric-card
          *ngFor="let metric of metricsArray()"
          [metric]="metric">
        </app-metric-card>
      </div>
    </div>
  `,
  styles: [`
    .metrics-dashboard {
      padding: 2rem;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .header {
      margin-bottom: 2rem;
    }

    .header-content {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin: 0;
      color: #2d3748;
      font-size: 1.75rem;
      font-weight: 700;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

    @media (max-width: 768px) {
      .metrics-dashboard {
        padding: 1rem;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MetricsDashboardComponent implements OnInit {
  private metricsService = inject(MetricsService);

  metrics = this.metricsService.metrics;
  loading = this.metricsService.loading;
  error = this.metricsService.error;

  ngOnInit(): void {
    this.metricsService.getMetrics();
  }

  metricsArray() {
    const metrics = this.metrics();
    return Object.keys(metrics).map(key => ({
      label: key,
      value: metrics[key]
    }));
  }
}
