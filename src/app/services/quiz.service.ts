import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Quiz } from '../types/quiz';
import { catchError, Observable, tap } from 'rxjs';
import { QuizInfo } from '../types/quiz-info';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);
  private alertService = inject(AlertService);

  getQuizzes(): Observable<QuizInfo[]> {
    return this.httpClient.get<QuizInfo[]>(`${this.baseUrl}/quizzes/`, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  getQuizById(quizId: string) {
    return this.httpClient.get<Quiz>(`${this.baseUrl}/quizzes/${quizId}`, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  getUserQuizzes(): Observable<QuizInfo[]> {
    return this.httpClient.get<QuizInfo[]>(`${this.baseUrl}/quizzes/user`, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  createQuiz(quiz: Quiz) {
    return this.httpClient.post(`${this.baseUrl}/quizzes`, quiz, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  editQuiz(quiz: Quiz) {
    return this.httpClient.put(`${this.baseUrl}/quizzes/${quiz.id}`, quiz, { withCredentials: true })
      .pipe(catchError(err => {
        console.error(err);
        this.alertService.showAlert('an error occured while saving quiz.', 'error');
        throw err;
      }));
  }

  /* TODO: Move themes to new service */

  getThemes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/themes`, { withCredentials: true })
      .pipe(
        catchError(err => { console.error(err); throw err })
      )
  }

  createTheme(themeName: string) {
    return this.httpClient.post(`${this.baseUrl}/themes`, { 'name': themeName }, { withCredentials: true, })
      .pipe(catchError(err => { console.error(err); throw err }));
  }
}
