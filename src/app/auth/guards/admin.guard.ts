import { CanActivateFn, Router } from '@angular/router';
import { RbacService } from '../rbac.service';
import { inject } from '@angular/core';
import { Roles } from '../../types/roles';
import { AuthService } from '../auth.service';
import { first, map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    first(x => !!x),
    map(user => {
      if(user.role == Roles.ADMINISTRATOR){
        return true;
      }
      router.navigate(['login']);
      return false;
    })
  );

};
