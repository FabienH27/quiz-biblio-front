import { Component, inject, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from "../multiselect/multiselect.component";

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectComponent],
  templateUrl: './theme-dropdown.component.html',
  styleUrl: './theme-dropdown.component.scss',
})
export class ThemeDropdownComponent implements OnInit{

  form: FormGroup;
  formGroup!: FormGroup;
  themesControl!: FormControl;
  themes: string[] = [];

  options: string[] = ['Literature', 'Cinema', 'Theatre'];

  controlContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      selectedOption: [''],
    });
  }

  ngOnInit(): void {
    this.themesControl = this.controlContainer.control?.get('themes') as FormControl;
    this.themes = this.themesControl.value; 
  }

  onOptionChange(event: string[]){
    console.log(event);
  }

}
