import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'librarian',
    component: LibrarianComponent,
  },
];
