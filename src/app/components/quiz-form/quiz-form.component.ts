import { ChangeDetectorRef, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Quiz } from '../../types/quiz';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuizFormService } from '../../services/quiz-form.service';
import { JsonPipe, NgIf } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { ImageSelectionComponent } from '../form/image-selection/image-selection.component';
import { ThemeDropdownComponent } from '../form/theme-dropdown/theme-dropdown.component';
import { QuestionFormComponent } from './quiz-creation-question/question-form.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [QuestionFormComponent, ImageSelectionComponent, ReactiveFormsModule, JsonPipe, NgIcon, NgIf, ThemeDropdownComponent],
  providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent implements OnInit {

  quizFormService = inject(QuizFormService);
  
  form!: FormGroup;

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

  get imageId(){
    return this.formImage?.value ?? null;
  }

  get formImage(){
    return this.form.get('imageId');
  }

  ngOnInit(): void {    
    var quizData = this.quiz();
    this.form = this.quizFormService.createQuizForm(quizData);
    
    if(quizData){
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
    if(this.form.valid && this.form.dirty && this.form.touched){
      const formValue: Quiz = this.form.value;
      const quizFormValue = { ...formValue, creator: this.quiz()?.creator ?? null };
      this.onFormSubmit.emit(quizFormValue);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onThemeChange(data: string[]){
    this.themes?.setValue(data);
  }

  updateImage(imageId: string){
    this.formImage?.setValue(imageId);
  }
}
