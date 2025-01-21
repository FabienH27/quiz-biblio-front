import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposal, Question, Quiz } from '../types/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizFormService {

  fb = inject(FormBuilder);

  quizForm: FormGroup;

  get questions(): FormArray{
    return this.quizForm.get('questions') as FormArray;
  }

  constructor() {
    this.quizForm = this.createQuizForm();
  }

  createQuizForm(quiz?: Quiz): FormGroup{
    return this.fb.group({
      id: [quiz?.id || null ],
      themes: [quiz?.themes || []],
      title: [quiz?.title || '', [Validators.required]],
      questions: this.fb.array([
        this.createQuestionForm(),
      ]),
    });
  }

  createQuestionForm(question?: Question): FormGroup{
    return this.fb.group({
      id: [question?.id || null],
      text: [question?.text || null, [Validators.required]],
      details: [question?.details || null, [Validators.required]],
      proposals: this.fb.array([
        this.createProposalForm(),
        this.createProposalForm()
      ]
      ),
      correctProposalIds: [question?.correctProposalIds || [], [Validators.required]]
    });
  }

  createProposalForm(proposal?: Proposal): FormGroup{
    return this.fb.group({
      id: [proposal?.id || null],
      text: [proposal?.text || '', [Validators.required]],
    });
  }

}
