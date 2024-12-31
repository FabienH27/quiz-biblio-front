import { Component, Input } from '@angular/core';
import { Quiz } from '../../../types/quiz';
import { QuizCreationQuestionComponent } from "./quiz-creation-question/quiz-creation-question.component";
import { ImageSelectionComponent } from '../../../components/image-selection/image-selection.component';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [QuizCreationQuestionComponent, ImageSelectionComponent],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {

  @Input() quiz: Quiz;

  constructor() {
    this.quiz = {
      title: null,
      image: null,
      questions: []
    }
  }

}
