import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { UserScore } from '../types/user-score';

@Injectable({
  providedIn: 'root'
})
export class UserScoreService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getUserScore(userId: string) {
    return this.httpClient.get<UserScore>(`${this.baseUrl}/UserQuizScore/${userId}`)
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  saveUserScore(userScore: number) {
    //no body : score is computed on the server side
    return this.httpClient.post(`${this.baseUrl}/UserQuizScore`, {userScore}, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

}
