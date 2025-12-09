import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

export const tasksListRoutes: Routes = [
  {
    path: '',
    component: TasksListComponent
  },
  {
    path: ':id',
    component: TaskDetailComponent
  }
];
