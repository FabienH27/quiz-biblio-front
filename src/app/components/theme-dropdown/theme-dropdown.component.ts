import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  errorMessage: string | null = null;

  controlContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor() {
    this.form = this.fb.group({
      themeSelection: ['', Validators.required],
    });
  }

  get themeSelection(){
    return this.form.get('themeSelection') as FormControl;
  }

  ngOnInit(): void {
    this.themesControl = this.controlContainer.control?.get('themes') as FormControl;
    this.themes = this.themesControl.value;

  }

  onOptionChange(selectionOptions: string[]){
    if(selectionOptions.length == 0){
      this.errorMessage = 'Please select a theme';
    }else{
      this.errorMessage = null;      
    }
    this.onSelectionChange.emit(selectionOptions);
  }

}
