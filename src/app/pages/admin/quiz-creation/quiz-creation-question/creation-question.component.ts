import { Component, inject, Input, OnInit } from '@angular/core';
import { ImageSelectionComponent } from "../../../../components/image-selection/image-selection.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle, heroTrash } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateProposalComponent } from './quiz-creation-proposal/creation-proposal.component';
import { QuizFormService } from '../../../../services/quiz-form.service';

@Component({
  selector: 'create-question',
  standalone: true,
  imports: [CreateProposalComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule],
  providers: [provideIcons({ heroPlusCircle, heroTrash })],
  templateUrl: './creation-question.component.html',
  styleUrl: './creation-question.component.scss'
})
export class CreateQuestionComponent implements OnInit {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);
  private formService = inject(QuizFormService);


  @Input() questionIndex = 0;

  questions!: FormArray;
  formGroup!: FormGroup;

  get proposals() {
    const test = this.formGroup.get('proposals') as FormArray;
    return test;
  }

  get correctProposalIds() {
    const question = this.questions.at(this.questionIndex);
    return question.get('correctProposalIds');
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

}
