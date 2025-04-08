import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { uniqueNamesGenerator, adjectives, animals, Config } from 'unique-names-generator';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { Answer } from '../types/answer';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private readonly httpClient = inject(HttpClient);

  private readonly storageKey = 'guestUsername';
  private readonly sessionKey = 'guestSessionStarted';

  baseUrl = environment.apiUrl;

  randomNameConfig: Config = {
    dictionaries: [adjectives, animals, ],
    separator: '-',
    length: 2,
  };

  private _userScore = 0;

  public set userScore(v : number) {
    this._userScore = v;
  }

  public get userScore() : number {
    return this._userScore;
  }

  private _userDraft : Map<string, Answer> | null = null;

  public get userDraft(){
    return this._userDraft;
  }

  private set userDraft(draft: Map<string, Answer> | null){
    this._userDraft = draft;
  }

  saveUserToStorage(userName: string){
    localStorage.setItem(this.storageKey, userName);
  }

  getUserName(){
    let userName = localStorage.getItem(this.storageKey) 
    if(userName === null){
      userName = this.getRandomUserName();
      this.saveUserToStorage(userName);
    }

    return localStorage.getItem(this.storageKey);
  }

  getUserFromStorage(){
    //prevents empty user name
    if(localStorage.getItem(this.storageKey) === null){
      localStorage.setItem(this.storageKey, this.getRandomUserName());
    }

    return localStorage.getItem(this.storageKey);
  }

  getRandomUserName(){
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

  clearSession(){
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.storageKey);

    this.httpClient.delete(`${this.baseUrl}/guest/end-session`, {withCredentials: true}).subscribe();
  }

  initGuestSession(): Observable<void>{
    if(this.hasSessionStarted()){
      return of();
    }

    let userName = this.getUserName();
    if(!userName){
      userName = this.getRandomUserName();
      this.saveUserToStorage(userName);
    }

    //find a way to prevent guest session spamming from users
    return this.httpClient.post<void>(`${this.baseUrl}/guest/init-session?username=${encodeURIComponent(userName)}`, {}, {withCredentials: true})
      .pipe(
        tap(() => this.setSessionStarted())
      );
  }

  /**
   * Saves given data to localStorage before submission
   * @param quizId id of the played quiz
   * @param answers answers given by the user
   */
  markAnswersAsDraft(quizId: string, answers: {questionId: string; answer: Answer}[]){
    localStorage.setItem('quizDraft', JSON.stringify({
      quizId,
      answers
    }));
  }

  savePlayerScore(userScore: number){
    this.httpClient.post(`${this.baseUrl}/quizplay/merge-score`, {userScore});
  }
}
