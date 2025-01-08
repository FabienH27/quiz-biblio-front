import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { userResolver } from './resolvers/user.resolver';
import { QuizCreationComponent } from './pages/admin/quiz-creation/quiz-creation.component';
import { adminGuard } from './auth/guards/admin.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, resolve: { user: userResolver } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                component: AdminComponent,
            },
            {
                path: 'create',
                component: QuizCreationComponent,
            }
        ]
    },
    { path: '**', redirectTo: '' },
];
