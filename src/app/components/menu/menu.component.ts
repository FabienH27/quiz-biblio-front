import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject, input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3BottomRight, heroXMark } from '@ng-icons/heroicons/outline';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RbacService } from '../../services/rbac.service';
import { Roles } from '../../types/roles';
import { User } from '../../types/user';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";

@Component({
    selector: 'app-menu',
    imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIconComponent, TranslocoPipe, LanguageSelectorComponent],
    providers: [provideIcons({ heroXMark, heroBars3BottomRight })],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {

  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly authService = inject(AuthService);
  readonly rbacService = inject(RbacService);

  isOpen = false;

  userData$: Observable<User | null> = this.authService.user$;

  user = input<User>();

  private navigationSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.navigationSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.closeMenu();
      }
    })
  }

  ngOnDestroy(): void {
    if(this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu(){
    this.isOpen = false;
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
