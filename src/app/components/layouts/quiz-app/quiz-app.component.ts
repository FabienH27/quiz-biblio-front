import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-quiz',
  imports: [RouterOutlet, MenuComponent],
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `
})
export class QuizAppComponent {}
