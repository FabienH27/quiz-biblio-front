import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Quiz } from '../types/quiz';
import { catchError, Observable, tap } from 'rxjs';
import { prepareQuizPayload } from '../types/quiz-request';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  createQuiz(quiz: Quiz) {
    const payload = prepareQuizPayload(quiz);
    return this.httpClient.post(`${this.baseUrl}/quizzes`, payload, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }))
      .subscribe();
  }

  getThemes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/themes`, { withCredentials: true })
      .pipe(
        catchError(err => { console.error(err); throw err })
      )
  }

  createTheme(themeName: string){
    return this.httpClient.post(`${this.baseUrl}/themes`, { 'name': themeName }, { withCredentials: true,  })
      .pipe(catchError(err => {console.error(err); throw err }));
  }
}
