import { Component, inject, OnInit } from '@angular/core';
import { CreateQuestionComponent } from "./quiz-creation-question/creation-question.component";
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { Quiz } from '../../../types/quiz';
import { QuizFormService } from '../../../services/quiz-form.service';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { QuizService } from '../../../services/quiz.service';
import { ThemeDropdownComponent } from "../../../components/theme-dropdown/theme-dropdown.component";

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

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get title() {
    return this.form.get('title');
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
      this.quizService.createQuiz(formValue);

    }
  }
}
