import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { RbacService } from '../../auth/rbac.service';
import { IsGrantedDirective } from '../../components/is-granted/is-granted.directive';
import { User } from '../../types/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, IsGrantedDirective, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  readonly rbacService = inject(RbacService);

  userInfo$: Observable<User | null> = of(null);

  userData$: Observable<User | null> = this.authService.user$;

  user: User | null = null;

  logout(){
    this.authService.logout();
  }

}
