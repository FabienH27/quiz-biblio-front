import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, first, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RbacService } from '../services/rbac.service';
import { Roles } from '../types/roles';
import { AlertService } from '../services/alert.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const rbacService = inject(RbacService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  return authService.getUserInfo().pipe(
    first(x => !!x),
    map(user => {
      rbacService.setAuthenticatedUser(user);
      if(user.role == Roles.ADMINISTRATOR){
        return true;
      }
      alertService.showAlert('You are not allowed to access this page.', 'error');
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      router.navigate(['login'], {queryParams:{'redirectUrl': state.url}});
      return of(false);
    })
  );

};
