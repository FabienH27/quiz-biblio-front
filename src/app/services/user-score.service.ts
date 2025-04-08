import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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
    return this.httpClient.post(`${this.baseUrl}/quizplay/save-score`, { userScore }, { withCredentials: true });
  }

}
