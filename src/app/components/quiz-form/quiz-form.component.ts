import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { QuizFormService } from '../../services/quiz-form.service';
import { Quiz } from '../../types/quiz';
import { ImageSelectionComponent } from '../image-selection/image-selection.component';
import { ThemeDropdownComponent } from '../theme-dropdown/theme-dropdown.component';
import { QuestionFormComponent } from './quiz-creation-question/question-form.component';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [QuestionFormComponent, ImageSelectionComponent, ReactiveFormsModule, NgIcon, NgIf, ThemeDropdownComponent],
  providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent implements OnInit {

  quizFormService = inject(QuizFormService);
  
  // $cd = inject(ChangeDetectorRef);

  form: FormGroup;

  quiz = input<Quiz | null>();
  submitPlaceholder = input<string>("Create quiz");
  maxQuestionCount = input<number>(50);

  onFormSubmit = output<Quiz>();

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get title() {
    return this.form.get('title');
  }

  get themes() {
    return this.form.get('themes');
  }

  get isTitleValid() {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched);
  }

  constructor(private $cd: ChangeDetectorRef) {
    this.form = this.quizFormService.createQuizForm();
  }

  ngOnInit(): void {
    var test = this.quiz();
    if(test){
      this.form.patchValue(test);
    }

  }

  addQuestion() {
    this.questions.push(this.quizFormService.createQuestionForm());
  }

  onQuestionRemoval(questionId: number) {
    this.questions.removeAt(questionId);
  }

  onSubmit() {
    if(this.form.valid && this.form.touched){
      const formValue: Quiz = this.form.value;
      const quizFormValue = { ...formValue, creator: this.quiz()!.creator };
      this.onFormSubmit.emit(quizFormValue);
      console.log("submit");

      const formStatus = signal(this.form.status);
      this.form.statusChanges.subscribe(status => formStatus.set(status));

      this.form.markAsPristine();
      this.form.markAsUntouched();

      this.$cd.detectChanges();

    }
  }

  onThemeChange(data: string[]){
    this.themes?.setValue(data);
  }

}
