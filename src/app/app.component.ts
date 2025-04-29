import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./components/alert/alert.component";
import { MenuComponent } from './components/menu/menu.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, AlertComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Quizbiblio';
}
