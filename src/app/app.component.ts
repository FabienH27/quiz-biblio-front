import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./components/alert/alert.component";
import { MenuComponent } from './components/menu/menu.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, AlertComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  translateService = inject(TranslateService);

  title = 'Quizbiblio';

  constructor(){
    this.translateService.addLangs(['fr', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('fr');
  }

}
