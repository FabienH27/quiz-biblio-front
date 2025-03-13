import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckSolid, heroForwardSolid, heroPlaySolid } from '@ng-icons/heroicons/solid';
import { Observable, of } from 'rxjs';
import { PlayFinalStepComponent } from "../../components/play-quiz/play-final-step/play-final-step.component";
import { PlayQuizQuestionComponent } from '../../components/play-quiz/play-quiz-question/play-quiz-question.component';
import { ImageService } from '../../services/image.service';
import { UserScoreService } from '../../services/user-score.service';
import { Answer } from '../../types/answer';
import { Quiz } from '../../types/quiz';

@Component({
    selector: 'app-play-quiz',
    imports: [NgIconComponent, PlayQuizQuestionComponent, PlayFinalStepComponent, AsyncPipe],
    providers: [provideIcons({ heroPlaySolid, heroForwardSolid, heroCheckSolid })],
    templateUrl: './play-quiz.component.html',
    styleUrl: './play-quiz.component.css'
})
export class PlayQuizComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private scoreService = inject(UserScoreService);
  private imageService = inject(ImageService);

  @ViewChild('question') questionComponent!: PlayQuizQuestionComponent;

  quiz!: Quiz;

  isQuizInProgress = false;
  checkStep = false;
  finalStep = false;

  readonly currentStep = signal(0);

  answers = signal<Map<string, Answer>>(new Map<string, Answer>());

  imageUrl$!: Observable<string | null>;

  get currentQuestion() {
    return this.quiz.questions.at(this.currentStep())!;
  }

  get hasAnswered() {
    return this.answers().has(this.currentStep().toString());
  }

  get userScore() {
    const answerArray = Array.from(this.answers().values());
    return answerArray.filter((obj) => obj.isCorrect).length;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ quiz: quizData }) => {
      this.quiz = quizData;
    });
    this.imageUrl$ = this.loadImage();
  }

  loadImage() {
    if(!this.quiz.imageId){
      return of('');
    }

    return this.imageService.getImageUrl(this.quiz.imageId);
  }

  nextQuestion() {
    if (this.hasAnswered) {
      //More questions to proceed
      if ((this.currentStep() + 1) < this.quiz.questions.length) {
        this.currentStep.update(value => value + 1);
        this.checkStep = false;
        this.questionComponent.resetChoice();
      } else {
        this.finalStep = true;
        this.isQuizInProgress = false;
        this.scoreService.saveUserScore(this.userScore).subscribe();
      }
    }
  }

  validateQuiz() {
    this.checkStep = true;
  }

  startQuiz() {
    this.isQuizInProgress = true;
  }

  onAnswerChange(answer: Answer) {
    const updatedAnswers = new Map(this.answers());
    updatedAnswers.set(this.currentStep().toString(), answer);
    this.answers.set(updatedAnswers);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void{
    if(this.isQuizInProgress){
      $event.preventDefault();
    }
  }
}
