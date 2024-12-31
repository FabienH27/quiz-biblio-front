import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, first, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  alertService = inject(AlertService);
  router = inject(Router);

  private cachedUser: User | null = null;

  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {

    //unsubscribe is not necessary because it is a finite observable.
    // this.getUserInfo()
    //   .pipe()
    //   .subscribe(userInfo => this.userDataSubject.next(userInfo));
  }

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data, { withCredentials: true })
      .pipe(tap(() => {
        this.alertService.showAlert("Successfully logged in!");
      }));
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.userDataSubject.next(null);
        localStorage.removeItem('userInfo');
        this.cachedUser = null;
        this.alertService.showAlert("Successfully logged out!");
      },
      error: err => console.error(err)
    });
  }

  // getUserInfo(): Observable<User> {
  //   if (this.cachedUser) {
  //     return of(this.cachedUser);
  //   }

  //   const url = `${this.baseUrl}/auth/user-info`;
  //   return this.httpClient.get<User>(url, { withCredentials: true })
  //     .pipe(
  //       tap((user) => {
  //         localStorage.setItem('userInfo', JSON.stringify(user));
  //         this.userDataSubject.next(user);
  //       }),
  //       catchError((error) => {
  //         this.userDataSubject.next(null);
  //         localStorage.removeItem('userInfo');
  //         throw error;
  //       })
  //     );
  // }

  // setUserInfo(userInfo: User): void {
  //   this.userDataSubject.next(userInfo);
  //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
  // }

  loginAndFetchUserInfo(credentials: any): Observable<User | null> {
    return this.login(credentials).pipe(
      switchMap(() => this.fetchUser()),
    );
  }

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isLoggedIn(): boolean {
    //TODO: to be tweaked
    return !!localStorage.getItem('userInfo');
  }

  fetchUserInfo(): Observable<User> {
    const url = `${this.baseUrl}/auth/user-info`;
    return this.httpClient.get<User>(url, { withCredentials: true });
  }

  fetchUser(): Observable<User | null> {
    // Fetch user only if not already loaded
    if (!this.userSubject.value) {
      this.httpClient.get<User>(`${this.baseUrl}/auth/user-info`, { withCredentials: true }).subscribe(
        (user) => this.userSubject.next(user),
        (error) => {
          console.error('Failed to fetch user', error);
          this.userSubject.next(null);
        }
      );
    }
    return this.user$;
  }


}
