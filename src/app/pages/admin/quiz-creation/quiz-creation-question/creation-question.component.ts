import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ImageSelectionComponent } from "../../../../components/image-selection/image-selection.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle, heroTrash } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateProposalComponent } from './quiz-creation-proposal/creation-proposal.component';
import { QuizFormService } from '../../../../services/quiz-form.service';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'create-question',
  standalone: true,
  imports: [CreateProposalComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule, NgIf, NgClass],
  providers: [provideIcons({ heroPlusCircle, heroTrash })],
  templateUrl: './creation-question.component.html',
  styleUrl: './creation-question.component.scss'
})
export class CreateQuestionComponent implements OnInit {
  
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

  get hasCorrectProposal(){
    return this.correctProposalIds?.value.length == 0;
  }

  get questionText(){
    return this.form.get('text');
  }

  get details(){
    return this.form.get('details');
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
  }

  addProposal() {
    this.proposals.push(this.formService.createProposalForm());
  }

  onProposalRemoval(proposalId: number){
    this.proposals.removeAt(proposalId);
  }

  removeQuestion(questionId: number) {
    this.questionRemoval.emit(questionId);
  }
}
