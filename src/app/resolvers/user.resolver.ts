import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, tap } from 'rxjs';
import { User } from '../types/user';
import { RbacService } from '../auth/rbac.service';

export const userResolver: ResolveFn<User | null> = (): Observable<User | null> => {
    const authService = inject(AuthService);
    const rbacService = inject(RbacService);

    return authService.getUserInfo()
        .pipe(
            tap(user => {
                if (user != null) {
                    rbacService.setAuthenticatedUser(user);
                }
            })
        )
};
