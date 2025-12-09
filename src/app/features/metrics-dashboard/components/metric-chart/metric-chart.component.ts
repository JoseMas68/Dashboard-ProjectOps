import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-chart">
      <h3>Metric Chart</h3>
    </div>
  `,
  styles: [`
    .metric-chart {
      padding: 1rem;
    }
  `]
})
export class MetricChartComponent {}
