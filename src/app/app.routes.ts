import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { LoginComponent } from './login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isUserGuard } from './guards/is-user.guard';
import { isLibrarianGuard } from './guards/is-librarian.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isLoggedInGuard, isUserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'librarian',
    component: LibrarianComponent,
    canActivate: [isLoggedInGuard, isLibrarianGuard],
  },
];
