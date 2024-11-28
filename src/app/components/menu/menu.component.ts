import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RbacService } from '../../auth/rbac.service';
import { IsGrantedDirective } from '../../components/is-granted/is-granted.directive';
import { Roles } from '../../types/roles';
import { User } from '../../types/user';

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

  userInfo$: Observable<User | null> = of(null);

  userData: User | null = null;

  constructor(){
    this.userInfo$ = this.authService.userData$;

    this.authService.userData$.subscribe(data => {
      this.userData = data;

      this.rbacService.setAuthenticatedUser({
        id: data?.userId ?? "",
        name: data?.userName ?? "",
        role: {
          uid: data?.role.toUpperCase() as Roles
        } 
      });
    });
  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['']);
  }
}
