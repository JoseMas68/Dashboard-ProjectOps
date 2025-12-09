import { Routes } from '@angular/router';
import { ProjectsBoardComponent } from './projects-board.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

export const projectsBoardRoutes: Routes = [
  {
    path: '',
    component: ProjectsBoardComponent
  },
  {
    path: ':id',
    component: ProjectDetailComponent
  }
];
