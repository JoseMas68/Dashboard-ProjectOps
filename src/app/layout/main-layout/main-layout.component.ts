import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="main-layout">
      <app-header></app-header>
      <div class="layout-container">
        <app-sidebar></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .layout-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      background-color: #fafafa;
    }
  `]
})
export class MainLayoutComponent {}
