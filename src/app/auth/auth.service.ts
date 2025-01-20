import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, first, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
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

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }

  login(credentials: { email: string; password: string }){
    return this.httpClient.post(`${this.baseUrl}/auth/login`, credentials, { withCredentials: true });
  }

  getUserInfo(){
    const url = `${this.baseUrl}/auth/user-info`;    
    return this.httpClient.get<User>(url, { withCredentials: true })
      .pipe(
        first(),
        tap(user => {
          this.userSubject.next(user);
        }),
        catchError(_ => {
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

}
