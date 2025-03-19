import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposal, Question, Quiz } from '../types/quiz';
import { noWhitespaceValidator } from '../utils/validators/no-whitespace';

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

  createQuizForm(quiz?: Quiz | null): FormGroup{
    return this.fb.group({
      id: [quiz?.id || null ],
      imageId: [quiz?.imageId || null],
      themes: [quiz?.themes || []],
      title: [quiz?.title || '', [Validators.required, noWhitespaceValidator]],
      questions: this.fb.array([
        this.createQuestionForm(),
      ]),
    });
  }

  createQuestionForm(question?: Question): FormGroup{
    return this.fb.group({
      text: [question?.text || '', [Validators.required, noWhitespaceValidator]],
      details: [question?.details || null, [Validators.required]],
      imageId: [question?.imageId || null],
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
      text: [proposal?.text || '', [Validators.required]],
    });
  }

}
