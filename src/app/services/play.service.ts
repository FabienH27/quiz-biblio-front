import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { uniqueNamesGenerator, adjectives, animals, Config } from 'unique-names-generator';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';

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
    return this.httpClient.post<void>(`${this.baseUrl}/guest/init-session?username=${encodeURIComponent(userName)}`, {})
      .pipe(
        tap(() => this.setSessionStarted())
      );
  }
}
