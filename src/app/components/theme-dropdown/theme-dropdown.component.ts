import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from "./select-input/multiselect.component";

@Component({
  selector: 'app-theme-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectComponent],
  templateUrl: './theme-dropdown.component.html',
  styleUrl: './theme-dropdown.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ThemeDropdownComponent {

  form: FormGroup;
  options: string[] = ['Literature', 'Cinema', 'Theatre'];

  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      selectedOption: [''],
    });
  }

  onOptionChange(){
    console.log("option changed");
  }

}
