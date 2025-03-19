
import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';

@Component({
    selector: 'create-proposal',
    imports: [NgIcon, ReactiveFormsModule, NgClass],
    providers: [provideIcons({ heroTrash, heroCheckBadge, heroCheckBadgeSolid })],
    templateUrl: './proposal-form.component.html',
    styleUrl: './proposal-form.component.css'
})
export class ProposalFormComponent implements OnInit {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);

  proposals!: FormArray;
  formGroup!: FormGroup;

  proposalIndex = input<number>(0);
  isCorrect = input<boolean>(false);

  isProposalCorrect = this.isCorrect();

  readonly correctChange = output<boolean>();
  readonly proposalRemoval = output<number>();

  get proposal(){
    return this.form.get('text');
  }

  get isProposalInvalid(){
    return (this.proposal?.dirty || this.proposal?.touched) && this.proposal?.hasError('required');
  }

  ngOnInit() {
    this.proposals = this.controlContainer.control?.get(['proposals']) as FormArray;
    this.formGroup = this.proposals.at(this.proposalIndex()) as FormGroup;
    this.form = this.formGroup;
    this.isProposalCorrect = this.isCorrect();
  }

  onCorrectChange(event: Event) {
    this.isProposalCorrect = (event.target as HTMLInputElement).checked;
    this.correctChange.emit(this.isProposalCorrect);
  }

  removeProposal(proposalIndex: number) {
    this.proposalRemoval.emit(proposalIndex);
  }
}
