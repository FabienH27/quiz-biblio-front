import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {

  localStorage.removeItem("authUser");

  const router = inject(Router);

  return router.navigate(['']);
};
