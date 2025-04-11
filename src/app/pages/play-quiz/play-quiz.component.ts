import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, HostListener, inject, OnDestroy, OnInit, Signal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckSolid, heroForwardSolid, heroInformationCircleSolid, heroPlaySolid } from '@ng-icons/heroicons/solid';
import { iif, map, of, switchMap, take } from 'rxjs';
import { PlayFinalStepComponent } from "../../components/play-quiz/play-final-step/play-final-step.component";
import { PlayQuizQuestionComponent } from '../../components/play-quiz/play-quiz-question/play-quiz-question.component';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { PlayService } from '../../services/play.service';
import { Answer } from '../../types/answer';
import { Quiz } from '../../types/quiz';

@Component({
  selector: 'app-play-quiz',
  imports: [NgIconComponent, PlayQuizQuestionComponent, PlayFinalStepComponent, AsyncPipe, TranslocoPipe, FormsModule],
  providers: [provideIcons({ heroPlaySolid, heroForwardSolid, heroCheckSolid, heroInformationCircleSolid })],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.css'
})
export class PlayQuizComponent implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private imageService = inject(ImageService);
  private playService = inject(PlayService);
  private authService = inject(AuthService);

  readonly questionComponent = viewChild.required<PlayQuizQuestionComponent>('question');

  quiz!: Quiz;
  quizSignal: Signal<Quiz>;

  isQuizInProgress = false;
  checkStep = false;
  finalStep = false;

  userName: string | null = null;

  readonly currentStep = signal(0);

  answers = signal<Map<number, Answer>>(new Map<number, Answer>());

  imageUrl = computed(() => this.quiz ? this.loadImage() : null);

  get currentQuestion() {
    return this.quiz.questions.at(this.currentStep())!;
  }

  get hasAnswered() {
    const allValuesNonEmpty = [...this.answers().values()].every(obj => obj.value.length > 0);

    return this.answers().has(this.currentStep()) && allValuesNonEmpty;
  }

  get userScore() {
    const answerArray = Array.from(this.answers().values());
    return answerArray.filter((obj) => obj.isCorrect).length;
  }

  get themes() {
    return this.quiz.themes.sort().join(', ');
  }

  get loggedInUser() {
    return this.authService.user$;
  }

  constructor() {
    this.quizSignal = toSignal(this.activatedRoute.data.pipe(map((data) => data['quiz'])), { initialValue: null });

    effect(() => {
      const data = this.quizSignal();
      if (!data) return;
      this.quiz = data;
    });
  }

  ngOnInit(): void {  
    window.scrollTo(0,0);

    if(this.playService.isGoingToLogin()){
      this.finalStep = true;
      this.isQuizInProgress = false;
      this.playService.mergeGuestToUser().subscribe(data => {
        this.answers.set(data);
        this.playService.markLoginAsSuccessful();
        this.playService.clearSession();
      });
    }

    this.playService.getRandomUserName();

    this.userName = this.playService.getUserName();
  }

  ngOnDestroy(): void {
    if(!this.playService.isGoingToLogin()){
      this.playService.clearSession();
    }
  }

  loadImage() {
    if (!this.quiz.imageId) {
      return of('');
    }

    return this.imageService.getImageUrl(this.quiz.imageId);
  }

  nextQuestion() {
    this.scrollToQuestion();
    
    if (this.hasAnswered) {
      //More questions to proceed
      if ((this.currentStep() + 1) < this.quiz.questions.length) {
        this.currentStep.update(value => value + 1);
        this.checkStep = false;
        this.questionComponent().resetChoice();
      } else {
        //last step
        this.finalStep = true;
        this.isQuizInProgress = false;

        if(this.quiz.id){
          this.playService.submitAnswers(this.quiz.id, this.answers()).subscribe();
        }
      }
    }
  }

  private scrollToQuestion() {
    if(this.questionComponent()){
      const element = this.questionComponent().questionElementRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  validateQuiz() {
    this.checkStep = true;
  }

  startQuiz() {
    this.authService.isAuthenticated().pipe(
      take(1),
      switchMap(auth => 
        iif(
          () => !auth, 
          this.playService.initGuestSession(),
          of(false)
        )
      )
    ).subscribe(() => {
      this.isQuizInProgress = true;
    })
  }

  onAnswerChange(answer: Answer) {
    const updatedAnswers = new Map(this.answers());
    updatedAnswers.set(this.currentStep(), answer);
    this.answers.set(updatedAnswers);
  }

  userNameChanged(event: Event){
    const input = event.currentTarget as HTMLInputElement;
    this.userName = input.value;
    this.playService.saveUserToStorage(this.userName);
  }

  handleClick() {
    if (this.checkStep === true) {
      this.nextQuestion();
    } else {
      this.validateQuiz();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.isQuizInProgress) {
      this.playService.clearSession();
      $event.preventDefault();
    }
  }
}
