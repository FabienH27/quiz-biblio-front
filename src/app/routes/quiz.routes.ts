import { Routes } from "@angular/router";
import { QuizAppComponent } from "../components/layouts/quiz-app/quiz-app.component";
import { authGuard } from "../guards/auth.guard";
import { leaveQuizGuard } from "../guards/leave-quiz.guard";
import { CreationPanelComponent } from "../pages/creation-panel/creation-panel.component";
import { QuizCreationComponent } from "../pages/creation-panel/quiz-creation/quiz-creation.component";
import { QuizEditionComponent } from "../pages/creation-panel/quiz-edition/quiz-edition.component";
import { HomeComponent } from "../pages/home/home.component";
import { LoginComponent } from "../pages/login/login.component";
import { PlayQuizComponent } from "../pages/play-quiz/play-quiz.component";
import { RegisterComponent } from "../pages/register/register.component";
import { ScoreboardComponent } from "../pages/scoreboard/scoreboard.component";
import { quizResolver } from "../resolvers/quiz.resolver";

export const quizRoutes: Routes = [
    {
        path: '',
        component: QuizAppComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            {
                path: 'play/:id', component: PlayQuizComponent,
                resolve: { quiz: quizResolver },
                canDeactivate: [leaveQuizGuard]
            },
            { path: 'scoreboard', component: ScoreboardComponent, canActivate: [authGuard] },
            { path: 'register', component: RegisterComponent },
            {
                path: 'creation-panel',
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
        ]
    }
];
