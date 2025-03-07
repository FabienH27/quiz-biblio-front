import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle, heroTrash } from '@ng-icons/heroicons/outline';
import { QuizFormService } from '../../../services/quiz-form.service';
import { ImageSelectionComponent } from '../../form/image-selection/image-selection.component';
import { ProposalFormComponent } from './proposal-form/proposal-form.component';

@Component({
  selector: 'create-question',
  standalone: true,
  imports: [ProposalFormComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule, NgIf, NgClass],
  providers: [provideIcons({ heroPlusCircle, heroTrash })],
  templateUrl: 'question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent implements OnInit {

  controlContainer = inject(ControlContainer);
  private formService = inject(QuizFormService);

  form!: FormGroup;
  formGroup!: FormGroup;
  questions!: FormArray;

  @Input() questionIndex = 0;

  @Output() questionRemoval = new EventEmitter();

  get proposals() {
    const test = this.formGroup.get('proposals') as FormArray;
    return test;
  }

  get correctProposalIds() {
    const question = this.questions.at(this.questionIndex);
    return question.get('correctProposalIds');
  }

  get correctProposalIdsValue(){
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

  get isQuestionValid() {
    return (this.questionText?.dirty || this.questionText?.touched) && this.questionText?.hasError('required');
  }

  get isDetailsValid(){
    return (this.details?.dirty || this.details?.touched) && this.details?.hasError('required');
  }

  ngOnInit() {
    this.questions = this.controlContainer.control?.get(['questions']) as FormArray;
    this.formGroup = this.questions.at(this.questionIndex) as FormGroup;
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
}
