import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Analytics } from './pages/analytics/analytics';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'analytics',
    component: Analytics,
  },
  {
    path: 'board',
    redirectTo: '',
    pathMatch: 'full',
  },
];
