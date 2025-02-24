import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const playQuizGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['login'], {queryParams:{'redirectUrl': state.url}});
        return false;
      }
    })
  );
};
