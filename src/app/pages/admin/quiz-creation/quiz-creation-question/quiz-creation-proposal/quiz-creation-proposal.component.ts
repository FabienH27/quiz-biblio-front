import { Component, Input } from '@angular/core';
import { Proposal } from '../../../../../types/quiz';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckBadge, heroTrash } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'quiz-creation-question-proposal',
  standalone: true,
  imports: [NgIcon, FormsModule],
  providers: [provideIcons({heroTrash, heroCheckBadge})],
  templateUrl: './quiz-creation-proposal.component.html',
  styleUrl: './quiz-creation-proposal.component.scss'
})
export class QuizCreationProposalComponent {

  @Input() proposal: Proposal;

  constructor(){
    this.proposal = {
      text: null,
      isValid: false
    };
  }

}
