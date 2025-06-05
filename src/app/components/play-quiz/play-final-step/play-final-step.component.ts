import { Component, inject, input, OnInit } from '@angular/core';
import { Answer } from '../../../types/answer';
import { Quiz } from '../../../types/quiz';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroXMark } from '@ng-icons/heroicons/outline';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { PlayService } from '../../../services/play.service';
import { AuthService } from '../../../services/auth.service';
import { Observable, of } from 'rxjs';
import { UserScorePanelComponent } from '../../user-score-panel/user-score-panel.component';

@Component({
    selector: 'app-play-final-step',
    imports: [NgIconComponent, NgClass, RouterLink, TranslocoPipe, AsyncPipe, UserScorePanelComponent],
    providers: [provideIcons({ heroCheckCircle, heroXMark })],
    templateUrl: './play-final-step.component.html',
    styleUrl: './play-final-step.component.css'
})
export class PlayFinalStepComponent implements OnInit{

  private readonly router = inject(Router);
  private readonly playService = inject(PlayService);
  private readonly authService = inject(AuthService);

  answers = input.required<Map<number, Answer>>();
  quiz = input.required<Quiz>();
  userScore = input<number>(0);

  guestScore = this.playService.userScoreInfo;

  currentRoute = this.router.url;

  isAuthenticated$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  getIndex(index: number){
    return (index+1).toString().padStart(2,"0");
  }

  getQuestionByIndex(index: number){
    return this.quiz().questions.at(index);
  }

  getSelectionForQuestion(questionIndex: number){
    const userSelection = this.answers().get(questionIndex);
    const question = this.quiz().questions.at(questionIndex);

    return userSelection?.value?.map(index => question?.proposals[index]?.text ?? '') ?? [];
  }

  isAnswerCorrect(questionId: number){
    return this.answers().get(questionId)?.isCorrect;
  }

  authenticate(){
    this.playService.startAuthRedirect();
  }

}
