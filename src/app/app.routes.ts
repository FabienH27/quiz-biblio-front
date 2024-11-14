import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { logoutGuard } from './auth/logout.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LoginComponent, canActivate: [logoutGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
    { path: '**', component: HomeComponent},
];
