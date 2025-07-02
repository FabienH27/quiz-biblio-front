import { Routes } from '@angular/router';
import { quizRoutes } from './routes/quiz.routes';
import { adminRoutes } from './routes/admin.routes';

export const routes: Routes = [
    ...adminRoutes,
    ...quizRoutes,
    { path: '**', redirectTo: '' },
];
