import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AlertService } from '../services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  port = 32768;
  httpClient = inject(HttpClient);
  baseUrl = `https://localhost:${this.port}/api`; //TODO : move to config

  alertService = inject(AlertService);
  router = inject(Router);

  private userInfoSubject = new BehaviorSubject<{ userName: string; userId: string } | null>(
    this.getUserInfoFromLocalStorage()
  );
  userInfo$ = this.userInfoSubject.asObservable();

  localStorageKey = 'userInfo';

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data, { withCredentials: true})
      .pipe(tap(() => {
        this.alertService.showAlert("Successfully logged in!");
        this.router.navigate(['/']);
      }));
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true}).subscribe({
      next: () => {
        this.userInfoSubject.next(null);
        localStorage.removeItem(this.localStorageKey);
        this.alertService.showAlert("Successfully logged out!");
      },
      error: err => console.error(err)
    });
  }  

  getUserInfo(): Observable<{userName: string, userId: string}> {
    const url = `${this.baseUrl}/auth/user-info`;
    return this.httpClient.get<{userName: string, userId: string}>(url, {withCredentials: true });
  }

  setUserInfo(userInfo: { userName: string; userId: string }): void {
    this.userInfoSubject.next(userInfo);
    localStorage.setItem(this.localStorageKey, JSON.stringify(userInfo));
  }

  private getUserInfoFromLocalStorage(): { userName: string; userId: string } | null {
    const userInfo = localStorage.getItem(this.localStorageKey);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  loginAndFetchUserInfo(credentials: any): Observable<{userName: string, userId: string}> {
    return this.login(credentials).pipe(
      switchMap(() => this.getUserInfo()),
      tap(userInfo => this.setUserInfo(userInfo))
    );
  }
}
