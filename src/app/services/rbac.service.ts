import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class RbacService {

  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl;

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  setAuthenticatedUser(user: User){
    this.userRoleSubject.next(user.role)
  }
  
  isGranted(role: string): Observable<boolean> {
    return this.userRole$.pipe(
      map(userRole => userRole === role)
    );
  }
}
