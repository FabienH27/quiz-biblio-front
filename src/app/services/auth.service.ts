import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from '../services/alert.service';
import { User } from '../types/user';
import { RegisterData } from '../types/register-form';
import { LoginData } from '../types/login-form';
import { RbacService } from './rbac.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  private alertService = inject(AlertService);
  private rbacService = inject(RbacService);
  router = inject(Router);

  private userSubject = new ReplaySubject<User | null>(1);
  user$ = this.userSubject.asObservable();

  register(credentials: RegisterData) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, credentials, { withCredentials: true })
      .pipe(
        switchMap(() => this.getUserInfo())
      );
  }

  login(credentials: LoginData) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, credentials, { withCredentials: true })
      .pipe(
        switchMap(() => this.getUserInfo())
      );
  }

  getUserInfo() {
    const url = `${this.baseUrl}/auth/user-info`;
    return this.httpClient.get<User>(url, { withCredentials: true, headers: { 'skip-alert': 'true' } })
      .pipe(
        filter(user => !!user),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.rbacService.setAuthenticatedUser(user);
        }),
        catchError(() => {
          localStorage.removeItem('user');
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.userSubject.next(null);
        localStorage.removeItem('user');
        this.alertService.showAlert("Successfully logged out!", 'warning');
        this.router.navigate(['']);
      },
      error: err => console.error(err)
    });
  }

  isAuthenticated() {
    return this.httpClient.get<{ authenticated: true }>(`${this.baseUrl}/auth/status`, {
      withCredentials: true, headers: {
        'skip-alert': 'true'
      }
    }).pipe(
      map(response => response.authenticated),
      catchError((err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          return of(false);
        }
        return throwError(() => err);
      }),
    );
  }

}
