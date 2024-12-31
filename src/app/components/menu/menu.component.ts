import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
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
export class MenuComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  readonly rbacService = inject(RbacService);

  userInfo$: Observable<User | null> = of(null);

  userData: User | null = null;

  user: User | null = null;

  ngOnInit(): void {
    this.authService.fetchUser().subscribe();

    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });

  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['']);
  }

}
