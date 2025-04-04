import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  imports: [FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  private translocoService = inject(TranslocoService);

  languages = ['en', 'fr'];

  selectedLanguage = this.translocoService.getActiveLang();
  
  changeLanguage(newLang: string){
    if(this.translocoService.isLang(newLang)){
      this.translocoService.setActiveLang(newLang);
    }
  }
}
