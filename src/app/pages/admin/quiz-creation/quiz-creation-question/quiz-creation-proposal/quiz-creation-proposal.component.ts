import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'quiz-creation-question-proposal',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule],
  providers: [provideIcons({ heroTrash, heroCheckBadge, heroCheckBadgeSolid })],
  templateUrl: './quiz-creation-proposal.component.html',
  styleUrl: './quiz-creation-proposal.component.scss'
})
export class QuizCreationProposalComponent {

  @Input() formGroup!: FormGroup;
  @Input() index!: number;

  get isCorrect(){
    return this.formGroup.get('isCorrect');
  }

  get text(){
    return this.formGroup.get('proposalText');
  }

}
