import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quiz } from '../types/quiz';
import { QuizInfo } from '../types/quiz-info';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  private quizItemsSubject = new BehaviorSubject<QuizInfo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  quizzes$ = this.quizItemsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  getQuizzes() {
    this.loadingSubject.next(true);

    this.httpClient.get<QuizInfo[]>(`${this.baseUrl}/quizzes/`, { withCredentials: true })
      .pipe(
        catchError(err => { console.error(err); return of([]) }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(data => this.quizItemsSubject.next(data));
  }

  getQuizById(quizId: string) {
    return this.httpClient.get<Quiz>(`${this.baseUrl}/quizzes/${quizId}`, { withCredentials: true });
  }

  getUserQuizzes() {
    return this.httpClient.get<QuizInfo[]>(`${this.baseUrl}/quizzes/user`, { withCredentials: true })
      .subscribe(data => this.quizItemsSubject.next(data));
  }

  createQuiz(quiz: Quiz) {
    return this.httpClient.post(`${this.baseUrl}/quizzes`, quiz, { withCredentials: true });
  }

  editQuiz(quiz: Quiz) {
    return this.httpClient.put(`${this.baseUrl}/quizzes/${quiz.id}`, quiz, { withCredentials: true });
  }

  deleteQuiz(quizId: string) {
    return this.httpClient.delete(`${this.baseUrl}/quizzes/${quizId}`, { withCredentials: true })
      .pipe(
        tap(() => {
          const updatedItems = this.quizItemsSubject.value.filter(item => item.id !== quizId);
          this.quizItemsSubject.next(updatedItems);
        }));
  }
}
