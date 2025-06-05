import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { adjectives, animals, Config, uniqueNamesGenerator } from 'unique-names-generator';
import { environment } from '../../environments/environment';
import { Answer } from '../types/answer';
import { Score } from '../types/guest-score';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private readonly httpClient = inject(HttpClient);

  private readonly storageKey = 'guestUsername';
  private readonly sessionKey = 'guestSessionStarted';

  private baseUrl = environment.apiUrl;

  readonly goingToAuth = signal(false);
  readonly userScoreInfo = signal<Score | null>(null);

  readonly randomNameConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
  };

  playState = signal<'start' | 'play' | 'check' | 'final'>('start');

  readonly answers = signal<Map<number, Answer>>(new Map<number, Answer>());

  saveUserToStorage(userName: string) {
    localStorage.setItem(this.storageKey, userName);
  }

  getOrCreateUserName(): string {
    let userName = localStorage.getItem(this.storageKey);

    if(!userName){
      userName = uniqueNamesGenerator(this.randomNameConfig);
      this.saveUserToStorage(userName);
    }
    
    return userName;
  }

  isGuestSessionStarted(): boolean {
    return localStorage.getItem(this.sessionKey) === 'true';
  }

  setSessionStarted(): void {
    localStorage.setItem(this.sessionKey, 'true');
  }

  clearGuestSession() {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.storageKey);
    this.playState.set('start');
    this.answers.set(new Map());

    return this.httpClient.delete(`${this.baseUrl}/guest/end-session`, { withCredentials: true });
  }

  initGuestSession(): Observable<void> {
    if (this.isGuestSessionStarted()) {
      return of();
    }

    const userName = this.getOrCreateUserName();

    return this.httpClient.post<void>(`${this.baseUrl}/guest/init-session?username=${encodeURIComponent(userName)}`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.setSessionStarted())
      );
  }

  submitAnswers(quizId: string, answers: Map<number, Answer>) {
    const answersArray = Array.from(answers.entries()).map(([questionId, answer]) => ({
      questionId,
      answers: answer.value,
      isCorrect: answer.isCorrect
    }));

    const payload = {
      quizId,
      answers: answersArray
    };

    return this.httpClient.post<Score>(`${this.baseUrl}/quizplay/submit-answers`, payload, { withCredentials: true }).pipe(
      tap(score => this.userScoreInfo.set(score))
    );
  }

  startAuthRedirect() {
    this.goingToAuth.set(true);
  }

  endAuthRedirect(){
    this.goingToAuth.set(false);
  }

  mergeGuestToUser() {
    return this.httpClient.post<Score>(`${this.baseUrl}/quizplay/merge-guest`, {}, { withCredentials: true })
      .pipe(
        tap(score => this.userScoreInfo.set(score)),
        switchMap(() => this.clearGuestSession()),
        tap(() => this.endAuthRedirect()),
        map(() => void 0)
      );
  }

  arrayToAnswerMap(data: Record<number, Answer>): Map<number, Answer> {
    return new Map(
      Object.entries(data).map(([key, value]) => [parseInt(key), value])
    );
  }
  
  setStatus(status: 'start' | 'play' | 'check' | 'final') {
    this.playState.set(status);
  }

}
