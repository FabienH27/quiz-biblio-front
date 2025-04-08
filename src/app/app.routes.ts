import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreationPanelComponent } from './pages/creation-panel/creation-panel.component';
import { RegisterComponent } from './pages/register/register.component';
import { userResolver } from './resolvers/user.resolver';
import { QuizCreationComponent } from './pages/creation-panel/quiz-creation/quiz-creation.component';
import { QuizEditionComponent } from './pages/creation-panel/quiz-edition/quiz-edition.component';
import { PlayQuizComponent } from './pages/play-quiz/play-quiz.component';
import { quizResolver } from './resolvers/quiz.resolver';
import { leaveQuizGuard } from './guards/leave-quiz.guard';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, resolve: { user: userResolver } },
    { path: 'login', component: LoginComponent },
    {
        path: 'play/:id', component: PlayQuizComponent,
        resolve: { quiz: quizResolver, user: userResolver },
        canDeactivate: [leaveQuizGuard]
    },
    { path: 'scoreboard', component: ScoreboardComponent, canActivate: [authGuard], resolve: { user: userResolver } },
    { path: 'register', component: RegisterComponent },
    {
        path: 'creation-panel',
        resolve: { user: userResolver },
        children: [
            {
                path: '',
                component: CreationPanelComponent,
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
