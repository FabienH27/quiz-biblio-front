import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./components/alert/alert.component";
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quizbiblio-front';
}
