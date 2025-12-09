import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-card" [class]="getCardClass()">
      <div class="metric-icon">{{ getIcon() }}</div>
      <div class="metric-value">{{ metric.value }}</div>
      <div class="metric-label">{{ formatLabel(metric.label) }}</div>
    </div>
  `,
  styles: [`
    .metric-card {
      background: white;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    .metric-card:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px);
    }

    .metric-card.projects::before {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    .metric-card.tasks::before {
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
    }

    .metric-card.team::before {
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
    }

    .metric-card.completed::before {
      background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
    }

    .metric-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      line-height: 1;
    }

    .metric-card.projects .metric-value {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-card.tasks .metric-value {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-card.team .metric-value {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-card.completed .metric-value {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-label {
      font-size: 1rem;
      color: #718096;
      font-weight: 600;
      text-transform: capitalize;
      letter-spacing: 0.5px;
    }
  `]
})
export class MetricCardComponent {
  @Input({ required: true }) metric!: { label: string; value: any };

  getIcon(): string {
    const icons: { [key: string]: string } = {
      'totalProjects': '📁',
      'activeProjects': '🚀',
      'totalTasks': '✔️',
      'completedTasks': '✅',
      'teamMembers': '👥',
      'inProgressTasks': '⏳'
    };
    return icons[this.metric.label] || '📊';
  }

  getCardClass(): string {
    if (this.metric.label.includes('Project')) return 'projects';
    if (this.metric.label.includes('Task')) return 'tasks';
    if (this.metric.label.includes('team') || this.metric.label.includes('Team')) return 'team';
    if (this.metric.label.includes('completed') || this.metric.label.includes('Completed')) return 'completed';
    return 'default';
  }

  formatLabel(label: string): string {
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}
