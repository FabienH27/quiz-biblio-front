import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';
import { ThemeDropdownComponent } from "../../../components/theme-dropdown/theme-dropdown.component";
import { AlertService } from '../../../services/alert.service';
import { QuizFormService } from '../../../services/quiz-form.service';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../types/quiz';
import { CreateQuestionComponent } from "./quiz-creation-question/creation-question.component";

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [CreateQuestionComponent, ImageSelectionComponent, ReactiveFormsModule, JsonPipe, NgIcon, NgIf, ThemeDropdownComponent],
  providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent implements OnInit {

  form!: FormGroup;

  protected MAX_QUESTION_COUNT = 50;

  private fb = inject(FormBuilder);
  private formService = inject(QuizFormService);
  private quizService = inject(QuizService);
  private alertService = inject(AlertService);

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get title() {
    return this.form.get('title');
  }

  get themes(){
    return this.form.get('themes');
  }

  get isTitleValid(){
    return this.title?.invalid && (this.title?.dirty || this.title?.touched);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formService.createQuizForm();
  }

  setProposals(question: any) {
    let arr: FormArray = new FormArray<FormGroup>([]);
    question.proposals.forEach((proposal: any) => {
      arr.push(
        this.fb.group({
          proposal: proposal.text,
          isCorrect: proposal.isCorrect
        })
      )
    });
    return arr;
  }

  addQuestion() {
    this.questions.push(this.formService.createQuestionForm());
  }

  onQuestionRemoval(questionId: number) {
    this.questions.removeAt(questionId);
  }

  onSubmit() {
    if(this.form.valid){
      const formValue : Quiz = this.form.value;
      this.quizService.createQuiz(formValue)
        .subscribe(() => {
          this.alertService.showAlert('Quiz successfully created', 'success');
        });
    }
  }

  onThemeChange(data: string[]){
    this.themes?.setValue(data);
  }
}