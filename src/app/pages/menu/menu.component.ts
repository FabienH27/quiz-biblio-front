import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  userService = inject(AuthService);

  isUserAuthenticated = false;

  get isLoggedIn(){
    return this.userService.isLoggedIn();
  }

  get userName(){
    return this.userService.getUsername();
  }

}
