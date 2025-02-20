import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { userResolver } from './resolvers/user.resolver';
import { QuizCreationComponent } from './pages/admin/quiz-creation/quiz-creation.component';
import { QuizEditionComponent } from './pages/admin/quiz-edition/quiz-edition.component';
import { PlayQuizComponent } from './pages/play-quiz/play-quiz.component';
import { quizResolver } from './resolvers/quiz.resolver';
import { adminGuard } from './guards/admin.guard';
import { playQuizGuard } from './guards/play-quiz.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, resolve: { user: userResolver } },
    { path: 'login', component: LoginComponent },
    { path: 'play/:id', component: PlayQuizComponent, resolve: {quiz: quizResolver, user: userResolver}, canDeactivate: [playQuizGuard] },
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
            },
            {
                path: 'edit/:id',
                component: QuizEditionComponent
            }
        ]
    },
    { path: '**', redirectTo: '' },
];
