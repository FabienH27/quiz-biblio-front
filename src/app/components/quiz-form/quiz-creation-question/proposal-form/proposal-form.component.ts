import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';
import { NgIf } from '@angular/common';

@Component({
  selector: 'create-proposal',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule, NgIf],
  providers: [provideIcons({ heroTrash, heroCheckBadge, heroCheckBadgeSolid })],
  templateUrl: './proposal-form.component.html',
  styleUrl: './proposal-form.component.scss'
})
export class ProposalFormComponent implements OnInit {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);

  proposals!: FormArray;
  formGroup!: FormGroup;

  @Input() proposalIndex = 0;
  @Input() isCorrect = false;

  @Output() correctChange = new EventEmitter<boolean>();
  @Output() proposalRemoval = new EventEmitter();

  get proposal(){
    return this.form.get('text');
  }

  get isProposalValid(){
    return (this.proposal?.dirty || this.proposal?.touched) && this.proposal?.hasError('required');
  }

  ngOnInit() {
    this.proposals = this.controlContainer.control?.get(['proposals']) as FormArray;
    this.formGroup = this.proposals.at(this.proposalIndex) as FormGroup;
    this.form = this.formGroup;
  }

  onCorrectChange(event: Event) {
    this.isCorrect = (event.target as HTMLInputElement).checked;
    this.correctChange.emit(this.isCorrect);
  }

  removeProposal(proposalIndex: number) {
    this.proposalRemoval.emit(proposalIndex);
  }
}
