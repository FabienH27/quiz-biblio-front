import { Component, input } from '@angular/core';
import { Answer } from '../../../types/answer';
import { Quiz } from '../../../types/quiz';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroXMark } from '@ng-icons/heroicons/outline';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-play-final-step',
    imports: [NgIconComponent, NgClass, RouterLink],
    providers: [provideIcons({ heroCheckCircle, heroXMark })],
    templateUrl: './play-final-step.component.html',
    styleUrl: './play-final-step.component.css'
})
export class PlayFinalStepComponent {

  answers = input.required<Map<string, Answer>>();
  quiz = input.required<Quiz>();
  userScore = input<number>(0);

  getIndex(index: number){
    return (index+1).toString().padStart(2,"0");
  }

  getQuestionByIndex(index: number){
    return this.quiz().questions.at(index);
  }

  getSelectionForQuestion(questionIndex: number){
    const userSelection = this.answers().get(questionIndex.toString());
    const question = this.quiz().questions.at(questionIndex);

    return userSelection?.value?.map(index => question?.proposals[index]?.text ?? '') ?? [];
  }

  isAnswerCorrect(questionId: number){
    return this.answers().get(questionId.toString())?.isCorrect;
  }

}
