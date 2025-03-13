import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IsGrantedDirective } from '../../utils/is-granted/is-granted.directive';
import { User } from '../../types/user';
import { AsyncPipe } from '@angular/common';
import { RbacService } from '../../services/rbac.service';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3BottomRight, heroXMark } from '@ng-icons/heroicons/outline';

@Component({
    selector: 'app-menu',
    imports: [RouterLink, RouterLinkActive, IsGrantedDirective, AsyncPipe, NgIconComponent],
    providers: [provideIcons({ heroXMark, heroBars3BottomRight })],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly authService = inject(AuthService);
  readonly rbacService = inject(RbacService);

  isOpen = false;

  userData$: Observable<User | null> = this.authService.user$;

  @Input() user: User = {} as User;

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

}
