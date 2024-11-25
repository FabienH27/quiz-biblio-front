import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  authService = inject(AuthService);

  userInfo$: Observable<{userName: string, userId: string} | null>;

  constructor(){
    this.userInfo$ = this.authService.userInfo$;
  }

}
