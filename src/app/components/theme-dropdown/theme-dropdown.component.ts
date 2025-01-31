import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectComponent } from "../multiselect/multiselect.component";
import { QuizService } from '../../services/quiz.service';
import { BehaviorSubject, catchError, combineLatest, debounceTime, filter, from, merge, mergeMap, Observable, of, skipWhile, startWith, Subject, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPuzzlePiece } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectComponent, AsyncPipe, NgIcon],
  providers: [provideIcons({heroPuzzlePiece})],
  templateUrl: './theme-dropdown.component.html',
  styleUrl: './theme-dropdown.component.scss',
})
export class ThemeDropdownComponent implements OnInit, OnDestroy {

  quizService = inject(QuizService);
  fb = inject(FormBuilder);
  controlContainer = inject(ControlContainer);

  private createTheme$ = new Subject<string>();

  form: FormGroup;
  formGroup!: FormGroup;
  themesControl!: FormControl;
  themes: string[] = [];
  newTheme: string = '';
  errorMessage: string | null = null;
  isCooldownActive = false;
  maxSelectable = 3;
  
  options$!: Observable<string[]>;

  @Output() onSelectionChange = new EventEmitter<string[]>();

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

    // const initialTrigger$ = this.quizService.getThemes();

    // this.options$ = merge(
    //   initialTrigger$,
    //   this.createTheme$,
    // ).pipe(
    //   tap((themeName) => {
    //     this.quizService.createTheme('theme')
    //   }),
    //   switchMap(() => this.quizService.getThemes())
    // );

    // const getThemes$ = this.quizService.getThemes();

    // this.options$ = this.quizService.getThemes();

    // this.createTheme$.pipe(
    //   switchMap(themeName => this.quizService.createTheme(themeName)),
    //   tap(() => {        
    //     this.options$ = this.quizService.getThemes();
    //   })
    // ).subscribe();

    this.options$ = merge(
      this.quizService.getThemes(),
      this.createTheme$.pipe(
        switchMap((themeName) => 
          this.quizService.createTheme(themeName).pipe(
            switchMap(() => this.quizService.getThemes())
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
    this.onSelectionChange.emit(selectionOptions);
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
