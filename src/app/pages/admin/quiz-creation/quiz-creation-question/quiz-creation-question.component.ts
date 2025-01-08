import { Component, inject, Input } from '@angular/core';
import { defaultQuestion, Question } from '../../../../types/quiz';
import { QuizCreationProposalComponent } from './quiz-creation-proposal/quiz-creation-proposal.component';
import { ImageSelectionComponent } from "../../../../components/image-selection/image-selection.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'quiz-creation-question',
  standalone: true,
  imports: [QuizCreationProposalComponent, ImageSelectionComponent, NgIcon, ReactiveFormsModule ],
  providers: [provideIcons({ heroPlusCircle })],
  templateUrl: './quiz-creation-question.component.html',
  styleUrl: './quiz-creation-question.component.scss'
})
export class QuizCreationQuestionComponent {

  private fb = inject(FormBuilder); 
  
  @Input() formGroup!: FormGroup;
  @Input() index!: number;

  get proposals(): FormArray{
    return this.formGroup.get('proposals') as FormArray;
  }

  addProposal(): void{
    const proposalGroup = this.fb.group({
      proposal: '',
      isCorrect: false
    });
    this.proposals.push(proposalGroup);
  }
}
