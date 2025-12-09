import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <a routerLink="/dashboard/projects" routerLinkActive="active">Proyectos</a>
          </li>
          <li>
            <a routerLink="/dashboard/tasks" routerLinkActive="active">Tareas</a>
          </li>
          <li>
            <a routerLink="/dashboard/team" routerLinkActive="active">Equipo</a>
          </li>
          <li>
            <a routerLink="/dashboard/metrics" routerLinkActive="active">Métricas</a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #f5f5f5;
      min-height: 100vh;
      padding: 1rem;
    }

    nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    nav li {
      margin-bottom: 0.5rem;
    }

    nav a {
      display: block;
      padding: 0.75rem 1rem;
      color: #333;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    nav a:hover {
      background-color: #e0e0e0;
    }

    nav a.active {
      background-color: #1976d2;
      color: white;
    }
  `]
})
export class SidebarComponent {}
