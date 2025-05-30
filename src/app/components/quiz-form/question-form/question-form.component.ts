import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle, heroTrash } from '@ng-icons/heroicons/outline';
import { QuizFormService } from '../../../services/quiz-form.service';
import { ImageSelectionComponent } from '../../form/image-selection/image-selection.component';
import { ProposalFormComponent } from './proposal-form/proposal-form.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-create-question',
    imports: [ProposalFormComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule, NgClass, TranslocoPipe],
    providers: [provideIcons({ heroPlusCircle, heroTrash })],
    templateUrl: 'question-form.component.html',
    styleUrl: './question-form.component.css'
})
export class QuestionFormComponent implements OnInit {

  controlContainer = inject(ControlContainer);
  private formService = inject(QuizFormService);

  form!: FormGroup;
  formGroup!: FormGroup;
  questions!: FormArray;

  questionIndex = input<number>(0);

  questionRemoval = output<number>();

  get proposals() {
    return this.formGroup.get('proposals') as FormArray;
  }

  get correctProposalIds() {
    const question = this.questions.at(this.questionIndex());
    return question.get('correctProposalIds');
  }

  get correctProposalIdsValue() {
    return this.correctProposalIds?.value as number[];
  }

  get hasCorrectProposal() {
    return this.correctProposalIds?.value.length == 0;
  }

  get questionText() {
    return this.form.get('text');
  }

  get details() {
    return this.form.get('details');
  }

  get imageId() {
    return this.formImage?.value ?? null;
  }

  get formImage() {
    return this.form.get('imageId');
  }

  get isQuestionInvalid() {
    return (this.questionText?.dirty || this.questionText?.touched) && this.questionText?.hasError('required');
  }

  get isDetailsInvalid() {
    return (this.details?.dirty || this.details?.touched) && this.details?.hasError('required');
  }

  ngOnInit() {
    this.questions = this.controlContainer.control?.get(['questions']) as FormArray;
    this.formGroup = this.questions.at(this.questionIndex()) as FormGroup;
    this.form = this.formGroup;
  }

  onProposalCorrectChange(proposalIndex: number, isCorrect: boolean) {
    const proposalIdValues = this.correctProposalIds?.value || [];

    if (isCorrect) {
      if (!proposalIdValues.includes(proposalIndex)) {
        proposalIdValues.push(proposalIndex);
      }
    } else {
      const index = proposalIdValues.indexOf(proposalIndex);
      if (index > -1) {
        proposalIdValues.splice(index, 1);
      }
    }

    this.correctProposalIds?.setValue(proposalIdValues);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  addProposal() {
    this.proposals.push(this.formService.createProposalForm());
  }

  onProposalRemoval(proposalId: number) {
    this.proposals.removeAt(proposalId);
  }

  removeQuestion(questionId: number) {
    this.questionRemoval.emit(questionId);
  }

  updateQuestionImage(imageId: string | null) {
    this.formImage?.setValue(imageId);
    this.formImage?.markAsDirty();
    this.formImage?.markAsTouched();
  }
}
