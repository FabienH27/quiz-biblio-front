import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  port = 32770;
  httpClient = inject(HttpClient);
  baseUrl = `https://localhost:${this.port}/api`; //TODO : move to config

  private userTokenSource = new BehaviorSubject<string | null>(localStorage.getItem('authUser'));
  userToken$ = this.userTokenSource.asObservable();

  alertService = inject(AlertService);

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/Auth/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/Auth/login`, data)
      .pipe(tap((result) => {
        const token = (result as any).token;
        localStorage.setItem('authUser', token);
        this.userTokenSource.next(token);
        this.alertService.showAlert("Successfully logged in!");
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getUsername(){
    if(this.userTokenSource.value != null){
      const tokenDecoded = jwtDecode(this.userTokenSource.value);
      return (tokenDecoded as any).userName;
    }
  }
}
