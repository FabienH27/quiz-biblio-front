import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { UserScore } from '../types/user-score';

@Injectable({
  providedIn: 'root'
})
export class UserScoreService {

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getScores(): Observable<UserScore[]> {
    return this.httpClient.get<UserScore[]>(`${this.baseUrl}/scores`, { withCredentials: true });
  }

  getUserScore(userId: string) {
    return this.httpClient.get<UserScore>(`${this.baseUrl}/scores/${userId}`, { withCredentials: true });
  }

  saveUserScore(userScore: number) {
    //no body : score is computed on the server side
    return this.httpClient.post(`${this.baseUrl}/scores`, { userScore }, { withCredentials: true });
  }

}
