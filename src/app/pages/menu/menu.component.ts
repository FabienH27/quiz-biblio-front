import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RbacService } from '../../auth/rbac.service';
import { IsGrantedDirective } from '../../components/is-granted/is-granted.directive';

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

  userInfo$: Observable<{userName: string, userId: string} | null>;

  constructor(){
    this.userInfo$ = this.authService.userInfo$;

    this.rbacService.setRoles([
      {
        id: 1,
        name: 'User',
        uid: 'USER',
        extends: null
      },
      {
        id: 3,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }
    ]);
    this.rbacService.setAuthenticatedUser({
      id: '67336e828d02039351fea743',
      name: 'User',
      role: {
        id: 3,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }
    });
  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['']);
  }

}
