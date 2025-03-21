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
import { leaveQuizGuard } from './guards/leave-quiz.guard';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, resolve: { user: userResolver } },
    { path: 'login', component: LoginComponent },
    {
        path: 'play/:id', component: PlayQuizComponent,
        resolve: { quiz: quizResolver, user: userResolver },
        canActivate: [authGuard],
        canDeactivate: [leaveQuizGuard]
    },
    { path: 'scoreboard', component: ScoreboardComponent, canActivate: [authGuard], resolve: { user: userResolver } },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin',
        resolve: { user: userResolver },
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
