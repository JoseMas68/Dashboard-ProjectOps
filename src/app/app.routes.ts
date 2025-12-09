import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/projects',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () => import('./features/projects-board/projects-board.routes').then(m => m.projectsBoardRoutes)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./features/tasks-list/tasks-list.routes').then(m => m.tasksListRoutes)
      },
      {
        path: 'team',
        loadChildren: () => import('./features/team-overview/team-overview.routes').then(m => m.teamOverviewRoutes)
      },
      {
        path: 'metrics',
        loadChildren: () => import('./features/metrics-dashboard/metrics-dashboard.routes').then(m => m.metricsDashboardRoutes)
      }
    ]
  }
];
