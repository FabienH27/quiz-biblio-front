import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from '../services/alert.service';
import { User } from '../types/user';
import { RegisterData } from '../types/register-form';
import { LoginData } from '../types/login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  private alertService = inject(AlertService);
  router = inject(Router);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  register(credentials: RegisterData) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, credentials);
  }

  login(credentials: LoginData) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, credentials, { withCredentials: true });
  }

  getUserInfo() {
    const url = `${this.baseUrl}/auth/user-info`;
    return this.httpClient.get<User>(url, { withCredentials: true })
      .pipe(
        first(),
        tap(user => {
          this.userSubject.next(user);
        }),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.userSubject.next(null);
        this.alertService.showAlert("Successfully logged out!", 'warning');
        this.router.navigate(['']);
      },
      error: err => console.error(err)
    });
  }

  isAuthenticated() {
    return this.httpClient.get<{ authenticated: true }>(`${this.baseUrl}/auth/status`, { withCredentials: true }).pipe(
      map(response => response.authenticated),
      catchError(() => of(false))
    );
  }

}
