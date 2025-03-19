import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../types/quiz';

export const quizResolver: ResolveFn<Quiz> = (route) => {
  const quizService = inject(QuizService);
  return quizService.getQuizById(route.paramMap.get('id')!);
};
