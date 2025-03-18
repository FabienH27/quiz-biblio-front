import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { User } from '../types/user';
import { AuthService } from '../services/auth.service';
import { RbacService } from '../services/rbac.service';

export const userResolver: ResolveFn<User | null> = (): Observable<User | null> => {
    const authService = inject(AuthService);
    const rbacService = inject(RbacService);
    
    //filter(user => !!user) would not work because we still need to perform the call even if no user is logged in 
    return authService.getUserInfo()
        .pipe(
            tap(user => {

                if(user != null){
                    rbacService.setAuthenticatedUser(user)
                }
            })
        )
};
