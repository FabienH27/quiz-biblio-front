import { CanActivateFn } from '@angular/router';
import { RbacService } from '../rbac.service';
import { inject } from '@angular/core';
import { Roles } from '../../types/roles';

export const adminGuard: CanActivateFn = () => {
  return inject(RbacService).isGranted(Roles.ADMINISTRATOR);
};
