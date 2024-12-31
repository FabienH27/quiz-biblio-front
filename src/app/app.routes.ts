import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { userResolver } from './resolvers/user.resolver';
import { adminGuard } from './auth/guards/admin.guard';
import { QuizCreationComponent } from './pages/admin/quiz-creation/quiz-creation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, resolve: {user: userResolver } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: 'create',
                component: QuizCreationComponent,
            }
        ]
    },
    { path: '**', component: HomeComponent},
];
