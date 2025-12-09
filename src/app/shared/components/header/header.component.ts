import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <h1>ProjectOps Dashboard</h1>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #1976d2;
      color: white;
      padding: 1rem 2rem;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `]
})
export class HeaderComponent {}
