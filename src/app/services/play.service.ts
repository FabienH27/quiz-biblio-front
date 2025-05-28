import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { uniqueNamesGenerator, adjectives, animals, Config } from 'unique-names-generator';
import { environment } from '../../environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { Answer } from '../types/answer';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private readonly httpClient = inject(HttpClient);

  private readonly storageKey = 'guestUsername';
  private readonly sessionKey = 'guestSessionStarted';

  private baseUrl = environment.apiUrl;

  readonly goingToAuth = signal(false);

  readonly randomNameConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
  };

  private readonly playStep = signal<'start' | 'play' | 'check' | 'final'>('start');

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
    this.playStep.set('start');
    this.answers.set(new Map());

    this.httpClient.delete(`${this.baseUrl}/guest/end-session`, { withCredentials: true }).subscribe();
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
      answers: answersArray,
    };

    return this.httpClient.post<void>(`${this.baseUrl}/quizplay/submit-answers`, payload, { withCredentials: true });
  }

  startAuthRedirect() {
    this.goingToAuth.set(true);
  }

  endAuthRedirect(){
    this.goingToAuth.set(false);
  }

  mergeGuestToUser(): Observable<Map<number, Answer>> {
    return this.httpClient.post<Record<number, Answer>>(`${this.baseUrl}/quizplay/merge-guest`, {}, { withCredentials: true })
      .pipe(
        map((data) => this.arrayToAnswerMap(data))
      );
  }

  arrayToAnswerMap(data: Record<number, Answer>): Map<number, Answer> {
    return new Map(
      Object.entries(data).map(([key, value]) => [parseInt(key), value])
    );
  }
  
  setStatus(status: 'start' | 'play' | 'check' | 'final') {
    this.playStep.set(status);
  }

  getPlayState() {
    return this.playStep();
  }

}
