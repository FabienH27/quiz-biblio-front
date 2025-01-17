import { Component, inject, OnInit } from '@angular/core';
import { CreateQuestionComponent } from "./quiz-creation-question/creation-question.component";
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { defaultQuestion, defaultQuiz, Question, Quiz } from '../../../types/quiz';
import { QuizFormService } from '../../../services/quiz-form.service';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [CreateQuestionComponent, ImageSelectionComponent, ReactiveFormsModule, JsonPipe, NgIcon],
  providers: [provideIcons({ heroPlusCircle })],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent implements OnInit {

  form!: FormGroup;

  private fb = inject(FormBuilder);
  private formService = inject(QuizFormService);

  // data = {
  //   title: 'First quiz',
  //   questions: [
  //     {
  //       text: 'lorem ipsum',
  //       answer: 'answer',
  //       proposals: [
  //         {
  //           text: 'proposal 1',
  //           isCorrect: true
  //         },
  //         {
  //           text: 'proposal 2',
  //           isCorrect: false
  //         }
  //       ]
  //     },
  //     {
  //       text: 'lorem ipsum ?',
  //       answer: 'answer',
  //       proposals: [
  //         {
  //           text: 'proposal 1',
  //           isCorrect: true
  //         }
  //       ]
  //     },
  //     // {
  //     //   text: 'lorem ipsum',
  //     //   answer: 'answer',
  //     //   proposals: [
  //     //     {
  //     //       text: 'proposal 1',
  //     //       isCorrect: true
  //     //     }
  //     //   ]
  //     // },
  //     // {
  //     //   text: 'lorem',
  //     //   answer: 'answer',
  //     //   proposals: [
  //     //     {
  //     //       text: 'proposal 1',
  //     //       isCorrect: true
  //     //     }
  //     //   ]
  //     // }
  //   ]
  // }

  data : Quiz = {
    title: null,
    image: null,
    id: -1,
    questions: []
  };

  get questions(): FormArray{
    return this.form.get('questions') as FormArray;
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.form = this.formService.createQuizForm();
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

  addQuestion() {   
    this.questions.push(this.formService.createQuestionForm());
  }

}
