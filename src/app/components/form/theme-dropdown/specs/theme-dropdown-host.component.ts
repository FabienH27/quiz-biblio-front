import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ThemeDropdownComponent } from "../theme-dropdown.component";

@Component({
    template: `<form [formGroup]="form">
        <app-theme-selection />
      </form>`,
    imports: [ThemeDropdownComponent, ReactiveFormsModule]
})
export class ThemeDropdownHostComponent {
  
    form = new FormGroup({
        themes: new FormControl('')
    });

    get themes() {
        return this.form.get('themes') as FormControl;
    }
}