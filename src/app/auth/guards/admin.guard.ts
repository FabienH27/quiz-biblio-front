import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Roles } from '../../types/roles';
import { first, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RbacService } from '../../services/rbac.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const rbacService = inject(RbacService);
  const router = inject(Router);

  return authService.getUserInfo().pipe(
    first(x => !!x),
    map(user => {
      rbacService.setAuthenticatedUser(user);
      if(user.role == Roles.ADMINISTRATOR){
        return true;
      }
      router.navigate(['login']);
      return false;
    })
  );

};
