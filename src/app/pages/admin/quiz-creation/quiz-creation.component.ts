import { Component, inject, Input } from '@angular/core';
import { Quiz } from '../../../types/quiz';
import { CreateQuestionComponent } from "./quiz-creation-question/creation-question.component";
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [CreateQuestionComponent, ImageSelectionComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {

  form!: FormGroup;

  private fb = inject(FormBuilder);

  data = {
    title: 'First quiz',
    questions: [
      {
        text: 'lorem ipsum',
        answer: 'answer',
        proposals: [
          {
            text: 'proposal 1',
            isCorrect: true
          },
          {
            text: 'proposal 2',
            isCorrect: false
          }
        ]
      },
      {
        text: 'lorem ipsum ?',
        answer: 'answer',
        proposals: [
          {
            text: 'proposal 1',
            isCorrect: true
          }
        ]
      },
      {
        text: 'lorem ipsum',
        answer: 'answer',
        proposals: [
          {
            text: 'proposal 1',
            isCorrect: true
          }
        ]
      },
      {
        text: 'lorem',
        answer: 'answer',
        proposals: [
          {
            text: 'proposal 1',
            isCorrect: true
          }
        ]
      }
    ]
  }
  
  constructor(){
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      title: this.data.title,
      questions: this.fb.array([])
    });

    this.data.questions.forEach(question => {
      this.questionsArray.push(
        this.fb.group({
          questionText: question.text,
          answer: question.answer,
          proposals: this.setProposals(question)
        })
      )
    });
  }

  setProposals(question: any){
    let arr : FormArray = new FormArray<FormGroup>([]);
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

  get questionsArray(){
    return this.form.get('questions') as FormArray;
  }

}
