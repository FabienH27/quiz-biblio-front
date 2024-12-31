import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../types/user';

export const userResolver: ResolveFn<User | null> = () : Observable<User | null> => {
  const authService = inject(AuthService);

  if(authService.isLoggedIn()){
    return authService.fetchUserInfo().pipe(
      catchError(() => of(null))
    );
  }else{
    return of(null);
  }

};
