import { Component, inject, Input } from '@angular/core';
import { Proposal, Question, Quiz } from '../../../types/quiz';
import { QuizCreationQuestionComponent } from "./quiz-creation-question/quiz-creation-question.component";
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [QuizCreationQuestionComponent, ImageSelectionComponent, ReactiveFormsModule, NgForOf],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {

  private fb = inject(FormBuilder); 

  @Input() quiz: Quiz | null = null;

  quizForm: FormGroup;

  constructor() {
    this.quizForm = this.fb.group({
      title: [this.quiz?.title || ''],
      image: [this.quiz?.image || ''],
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  get questions(): FormArray{
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(){
    const questionGroup = this.fb.group({
      question: '',
      proposals: this.fb.array([])
    });
    this.questions.push(questionGroup);
  }

}
