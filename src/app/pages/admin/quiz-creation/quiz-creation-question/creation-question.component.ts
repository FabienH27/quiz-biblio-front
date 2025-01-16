import { Component, inject, Input } from '@angular/core';
import { ImageSelectionComponent } from "../../../../components/image-selection/image-selection.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateProposalComponent } from './quiz-creation-proposal/creation-proposal.component';

@Component({
  selector: 'create-question',
  standalone: true,
  imports: [CreateProposalComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule ],
  providers: [provideIcons({ heroPlusCircle })],
  templateUrl: './creation-question.component.html',
  styleUrl: './creation-question.component.scss'
})
export class CreateQuestionComponent {

  form!: FormGroup;
  controlContainer = inject(ControlContainer);

  @Input() questionIndex = 0;

  questions!: FormArray;
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.questions = this.controlContainer.control?.get(['questions']) as FormArray;
    this.formGroup = this.questions.at(this.questionIndex) as FormGroup;
    this.form = this.formGroup;
  }

  get proposalsArray(){
    const test = this.formGroup.get('proposals') as FormArray;
    return test;
  }

}
