import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { QuizFormService } from '../../services/quiz-form.service';
import { Quiz } from '../../types/quiz';
import { ImageSelectionComponent } from '../form/image-selection/image-selection.component';
import { ThemeDropdownComponent } from '../form/theme-dropdown/theme-dropdown.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-quiz-form',
    imports: [QuestionFormComponent, ImageSelectionComponent, ReactiveFormsModule, NgIcon, ThemeDropdownComponent, NgClass, TranslocoPipe],
    providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
    templateUrl: './quiz-form.component.html',
    styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent implements OnInit {

  quizFormService = inject(QuizFormService);
  translocoService = inject(TranslocoService);

  form!: FormGroup;

  quiz = input<Quiz | null>();
  submitPlaceholder = input<string>(this.translocoService.translate('form.create-quiz'));
  maxQuestionCount = input<number>(10);

  formSubmit = output<Quiz>();

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get title() {
    return this.form.get('title');
  }

  get themes() {
    return this.form.get('themes');
  }

  get isTitleInvalid() {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched);
  }

  get imageId() {
    return this.formImage?.value ?? null;
  }

  get formImage() {
    return this.form.get('imageId');
  }

  ngOnInit(): void {
    const quizData = this.quiz();
    this.form = this.quizFormService.createQuizForm(quizData);

    if (quizData) {
      this.form.patchValue(quizData);
    }
  }

  addQuestion() {
    this.questions.push(this.quizFormService.createQuestionForm());
  }

  onQuestionRemoval(questionId: number) {
    this.questions.removeAt(questionId);
  }

  onSubmit() {
    if (this.form.valid && this.form.dirty && this.form.touched) {
      const formValue: Quiz = this.form.value;
      const quizFormValue = { ...formValue, creator: this.quiz()?.creator ?? null };
      this.formSubmit.emit(quizFormValue);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onThemeChange(data: string[]) {
    this.themes?.setValue(data);
    this.themes?.markAsDirty();
    this.themes?.markAsTouched();
  }

  updateImage(imageId: string | null) {
    this.formImage?.setValue(imageId);
    this.formImage?.markAsDirty();
    this.formImage?.markAsTouched();
  }
}
