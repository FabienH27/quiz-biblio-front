import { Component, HostListener, inject, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../types/user';
import { AsyncPipe } from '@angular/common';
import { RbacService } from '../../services/rbac.service';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3BottomRight, heroXMark } from '@ng-icons/heroicons/outline';
import { Roles } from '../../types/roles';

@Component({
    selector: 'app-menu',
    imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIconComponent],
    providers: [provideIcons({ heroXMark, heroBars3BottomRight })],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly authService = inject(AuthService);
  readonly rbacService = inject(RbacService);

  isOpen = false;

  userData$: Observable<User | null> = this.authService.user$;

  user = input<User>();

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  constructor() {
    this.openMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.openMenu();
  }

  openMenu(){
    if (window.innerWidth >= 768) {
      this.isOpen = true;
    }
  }

  isAdmin(user: User){
    return user.role === Roles.ADMINISTRATOR
  }

}
