import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPuzzlePiece } from '@ng-icons/heroicons/outline';
import { map, merge, Observable, Subject, switchMap } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';
import { MultiSelectComponent } from "../multiselect/multiselect.component";
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../../services/theme.service';

@Component({
    selector: 'app-theme-selection',
    imports: [ReactiveFormsModule, MultiSelectComponent, AsyncPipe, NgIcon, TranslocoPipe],
    providers: [provideIcons({ heroPuzzlePiece })],
    templateUrl: './theme-dropdown.component.html',
    styleUrl: './theme-dropdown.component.css'
})
export class ThemeDropdownComponent implements OnInit, OnDestroy {

  quizService = inject(QuizService);
  themeService = inject(ThemeService);

  fb = inject(FormBuilder);
  controlContainer = inject(ControlContainer);

  private createTheme$ = new Subject<string>();

  form: FormGroup;
  formGroup!: FormGroup;
  themesControl!: FormControl;
  themes: string[] = [];
  newTheme = '';
  errorMessage: string | null = null;
  isCooldownActive = false;
  maxSelectable = 3;
  
  options$!: Observable<string[]>;

  readonly selectionChange = output<string[]>();

  constructor() {
    this.form = this.fb.group({
      themeSelection: ['', Validators.required],
    });
  }

  get themeSelection() {
    return this.form.get('themeSelection') as FormControl;
  }

  ngOnInit(): void {
    this.themesControl = this.controlContainer.control?.get('themes') as FormControl;
    this.themes = this.themesControl.value;
    this.themeSelection.setValue(this.themes);

    this.options$ = merge(
      this.themeService.getThemes().pipe(
        map(arr => arr.sort())
      ),
      this.createTheme$.pipe(
        switchMap((themeName) => 
          this.themeService.createTheme(themeName).pipe(
            switchMap(() => this.themeService.getThemes())
          ))
      )
    )
  }

  ngOnDestroy(): void {
    this.createTheme$.complete();
  }

  onOptionChange(selectionOptions: string[]) {
    if (selectionOptions.length == 0) {
      this.errorMessage = 'Please select a theme';
    } else {
      this.errorMessage = null;
    }
    this.selectionChange.emit(selectionOptions);
  }

  onThemeCreation(theme: string){
    if(theme != this.newTheme){
      if(this.isCooldownActive) return;

      this.isCooldownActive = true;
      this.createTheme$.next(theme);

      setTimeout(() => {
        this.isCooldownActive = false;
      }, 3000);
    }
    
  }

}
