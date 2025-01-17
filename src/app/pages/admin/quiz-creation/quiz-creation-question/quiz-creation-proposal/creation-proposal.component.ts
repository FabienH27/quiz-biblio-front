import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'create-proposal',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule],
  providers: [provideIcons({ heroTrash, heroCheckBadge, heroCheckBadgeSolid })],
  templateUrl: './creation-proposal.component.html',
  styleUrl: './creation-proposal.component.scss'
})
export class CreateProposalComponent implements OnInit {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);

  proposals!: FormArray;
  formGroup!: FormGroup;

  isCorrect = false;

  @Input() proposalIndex = 0;

  @Output() correctChange = new EventEmitter<boolean>();

  ngOnInit(){
    this.proposals = this.controlContainer.control?.get(['proposals']) as FormArray;
    this.formGroup = this.proposals.at(this.proposalIndex) as FormGroup;
    this.form = this.formGroup;
  }

  onCorrectChange(event: Event){
    this.isCorrect = (event.target as HTMLInputElement).checked;
    this.correctChange.emit(this.isCorrect);
  }
}
