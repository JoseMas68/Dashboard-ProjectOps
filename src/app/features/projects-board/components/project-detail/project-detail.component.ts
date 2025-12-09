import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="project-detail">
      <h2>Project Detail</h2>
    </div>
  `,
  styles: [`
    .project-detail {
      padding: 1rem;
    }
  `]
})
export class ProjectDetailComponent {}
