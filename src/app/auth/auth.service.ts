import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  alertService = inject(AlertService);
  router = inject(Router);

  private userInfoSubject = new BehaviorSubject<{ userName: string; userId: string } | null>(null);
  userInfo$ = this.userInfoSubject.asObservable().pipe(filter((user) => !!user));

  isUserAuthenticated = new BehaviorSubject<boolean>(false);

  private cachedUser: { userName: string; userId: string } | null = null;

  constructor(){
    const savedUser = localStorage.getItem('userInfo');

    if(savedUser){
      this.userInfoSubject.next(JSON.parse(savedUser));
      this.isUserAuthenticated.next(true);
    }else{
      this.isUserAuthenticated.next(false);
    }
  }

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data, { withCredentials: true})
      .pipe(tap(() => {
        this.alertService.showAlert("Successfully logged in!");
        this.isUserAuthenticated.next(true);
      }));
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true}).subscribe({
      next: () => {
        this.userInfoSubject.next(null);
        localStorage.removeItem('userInfo');
        this.cachedUser = null;
        this.isUserAuthenticated.next(false);
        this.alertService.showAlert("Successfully logged out!");
      },
      error: err => console.error(err)
    });
  }  

  getUserInfo(): Observable<{userName: string, userId: string}> {
    if(this.cachedUser){
      return of(this.cachedUser);
    }
    
    const url = `${this.baseUrl}/auth/user-info`;
    return this.httpClient.get<{userName: string, userId: string}>(url, {withCredentials: true })
      .pipe(
        tap((user) => {
          this.cachedUser = user;
          this.userInfoSubject.next(user);
        }),
        catchError((error) => {
          console.error('error fetching user', error);
          throw error;
        })
      )
  }

  setUserInfo(userInfo: { userName: string; userId: string }): void {
    this.userInfoSubject.next(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  loginAndFetchUserInfo(credentials: any): Observable<{userName: string, userId: string}> {
    return this.login(credentials).pipe(
      switchMap(() => this.getUserInfo()),
      tap(userInfo => this.setUserInfo(userInfo))
    );
  }
}
