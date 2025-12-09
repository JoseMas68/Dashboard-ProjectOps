import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }

    .card-body {
      padding: 1rem;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
}
