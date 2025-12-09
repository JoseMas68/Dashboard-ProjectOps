import { Routes } from '@angular/router';
import { TeamOverviewComponent } from './team-overview.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

export const teamOverviewRoutes: Routes = [
  {
    path: '',
    component: TeamOverviewComponent
  },
  {
    path: ':id',
    component: MemberDetailComponent
  }
];
