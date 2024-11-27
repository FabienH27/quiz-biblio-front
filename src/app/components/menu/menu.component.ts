import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RbacService } from '../../auth/rbac.service';
import { IsGrantedDirective } from '../../components/is-granted/is-granted.directive';
import { Roles } from '../../types/roles';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, AsyncPipe, IsGrantedDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  authService = inject(AuthService);
  router = inject(Router);
  readonly rbacService = inject(RbacService);

  userInfo$: Observable<{userName: string, userId: string} | null> = of(null);

  constructor(){
    this.userInfo$ = this.authService.userData$;

    this.rbacService.setRoles([
      {
        id: 1,
        name: 'User',
        uid: Roles.USER,
      },
      {
        id: 3,
        name: 'Administrator',
        uid: Roles.ADMINISTRATOR,
      }
    ]);
    this.rbacService.setAuthenticatedUser({
      id: '67336e828d02039351fea743',
      name: 'User',
      role: {
        id: 3,
        name: 'Administrator',
        uid: Roles.ADMINISTRATOR,
      }
    });
  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['']);
  }

  // get isUserAuthenticated(){
    // return this.authService.isUserAuthenticated.value;
  // }

}
