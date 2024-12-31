import { Component, Input } from '@angular/core';
import { Question } from '../../../../types/quiz';
import { QuizCreationProposalComponent } from './quiz-creation-proposal/quiz-creation-proposal.component';
import { ImageSelectionComponent } from "../../../../components/image-selection/image-selection.component";

@Component({
  selector: 'quiz-creation-question',
  standalone: true,
  imports: [QuizCreationProposalComponent, ImageSelectionComponent],
  templateUrl: './quiz-creation-question.component.html',
  styleUrl: './quiz-creation-question.component.scss'
})
export class QuizCreationQuestionComponent {

  @Input() question: Question;

  constructor() {
    this.question = {
      question: null,
      details: null,
      image: null,
      proposals: [],
    }
  }

}
