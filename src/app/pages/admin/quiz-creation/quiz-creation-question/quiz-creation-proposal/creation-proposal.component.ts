import { Component, inject, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'create-proposal',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule],
  providers: [provideIcons({ heroTrash, heroCheckBadge, heroCheckBadgeSolid })],
  templateUrl: './creation-proposal.component.html',
  styleUrl: './creation-proposal.component.scss'
})
export class CreateProposalComponent {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);

  proposals!: FormArray;
  formGroup!: FormGroup;

  @Input() proposalIndex = 0;

  ngOnInit(): void {
    this.proposals = this.controlContainer.control?.get(['proposals']) as FormArray;
    this.formGroup = this.proposals.at(this.proposalIndex) as FormGroup;
    this.form = this.formGroup;
  }

  get isCorrect(){
    return this.form.controls['isCorrect'].value;
  }

}
