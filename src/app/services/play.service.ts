import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  private goingToLogin = false;

  randomNameConfig: Config = {
    dictionaries: [adjectives, animals,],
    separator: '-',
    length: 2,
  };

  saveUserToStorage(userName: string) {
    localStorage.setItem(this.storageKey, userName);
  }

  getUserName() {
    let userName = localStorage.getItem(this.storageKey)
    if (userName === null) {
      userName = this.getRandomUserName();
      this.saveUserToStorage(userName);
    }

    return localStorage.getItem(this.storageKey);
  }

  getUserFromStorage() {
    //prevents empty user name
    if (localStorage.getItem(this.storageKey) === null) {
      localStorage.setItem(this.storageKey, this.getRandomUserName());
    }

    return localStorage.getItem(this.storageKey);
  }

  getRandomUserName() {
    const randomName: string = uniqueNamesGenerator(this.randomNameConfig);

    this.saveUserToStorage(randomName);

    return randomName;
  }

  hasSessionStarted(): boolean {
    return localStorage.getItem(this.sessionKey) === 'true';
  }

  setSessionStarted(): void {
    localStorage.setItem(this.sessionKey, 'true');
  }

  clearSession() {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.storageKey);

    this.httpClient.delete(`${this.baseUrl}/guest/end-session`, { withCredentials: true }).subscribe();
  }

  initGuestSession(): Observable<void> {
    if (this.hasSessionStarted()) {
      return of();
    }

    let userName = this.getUserName();
    if (!userName) {
      userName = this.getRandomUserName();
      this.saveUserToStorage(userName);
    }

    //find a way to prevent guest session spamming from users
    return this.httpClient.post<void>(`${this.baseUrl}/guest/init-session?username=${encodeURIComponent(userName)}`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.setSessionStarted())
      );
  }

  // ---------------------------------------

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

  markAsGoingToLogin() {
    this.goingToLogin = true;
  }

  isGoingToLogin(): boolean {
    return this.goingToLogin;
  }

  markLoginAsSuccessful(){
    this.goingToLogin = false;
  }

  mergeGuestToUser(): Observable<Map<number, Answer>> {
    return this.httpClient.post<Record<number, Answer>>(`${this.baseUrl}/quizplay/merge-guest`, {}, { withCredentials: true })
      .pipe(
        map((data) => this.arrayToAnswerMap(data))
      );
  }

  arrayToAnswerMap(answersArray: Record<number, Answer>): Map<number, Answer> {
    const map = new Map<number, Answer>();

    Object.entries(answersArray).forEach(item => {
      const answer: Answer = {
        value: item[1].value,
        isCorrect: item[1].isCorrect
      };
      map.set(parseInt(item[0]), answer);
    })
    return map;
  }

}
