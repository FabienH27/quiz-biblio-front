import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IsGrantedDirective } from '../../utils/is-granted/is-granted.directive';
import { User } from '../../types/user';
import { AsyncPipe } from '@angular/common';
import { RbacService } from '../../services/rbac.service';
import { AuthService } from '../../services/auth.service';

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

  // user: User | null = null;

  @Input() user: User = {} as User; 

  logout(){
    this.authService.logout();
  }

}
