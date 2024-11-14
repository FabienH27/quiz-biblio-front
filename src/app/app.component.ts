import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./pages/menu/menu.component";
import { AlertComponent } from "./components/alert/alert.component";
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quizbiblio-front';

  alertService = inject(AlertService);


  get alertState(){
    return this.alertService.getState();
  }

}
