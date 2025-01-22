import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor() {
    this.form = this.fb.group({
      selectedOption: [''],
    });
  }

  ngOnInit(): void {
    this.themesControl = this.controlContainer.control?.get('themes') as FormControl;
    this.themes = this.themesControl.value; 
  }

  onOptionChange(selectionOptions: string[]){
    this.onSelectionChange.emit(selectionOptions);
  }

}
