import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroForwardSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-play-quiz-question',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({heroForwardSolid})],
  templateUrl: './play-quiz-question.component.html',
  styleUrl: './play-quiz-question.component.scss'
})
export class PlayQuizQuestionComponent {

  onNextQuestion(){

  }

}
