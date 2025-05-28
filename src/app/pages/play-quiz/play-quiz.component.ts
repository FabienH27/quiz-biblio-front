import { AsyncPipe } from '@angular/common';
import { Component, computed, HostListener, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
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

  protected readonly playStatus = this.playService.getPlayState();

  readonly questionComponent = viewChild.required<PlayQuizQuestionComponent>('question');

  readonly quizRaw = toSignal(
    this.activatedRoute.data.pipe(map(data => data['quiz'] as Quiz | null)),
    { initialValue: null }
  );
  
  readonly quiz = computed<Quiz>(() => {
    const value = this.quizRaw();
    if (!value) throw new Error('Quiz is not loaded yet');
    return value;
  });

  userName: string | null = null;

  readonly currentStep = signal(0);

  answers = this.playService.answers;

  imageUrl = computed(() => this.quiz() ? this.loadImage() : null);

  get currentQuestion() {
    return this.quiz().questions.at(this.currentStep())!;
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
    return this.quiz().themes.sort().join(', ');
  }

  get loggedInUser() {
    return this.authService.user$;
  }

  ngOnInit(): void {  
    window.scrollTo(0,0);

    if(this.playService.goingToAuth()){
      this.playService.setStatus('final');
      this.playService.mergeGuestToUser().subscribe(data => {
        this.answers.set(data);
        this.playService.endAuthRedirect();
        // this.playService.clearGuestSession();
      });
    }

    this.userName = this.playService.getOrCreateUserName();
  }

  ngOnDestroy(): void {
    if(!this.playService.goingToAuth()){
      this.playService.clearGuestSession();
    }
  }

  loadImage() {
    const imageId = this.quiz().imageId;
    if (!imageId) {
      return of('');
    }

    return this.imageService.getImageUrl(imageId);
  }

  nextQuestion() {
    this.scrollToQuestion();
    
    if (this.hasAnswered) {
      //More questions to proceed
      if ((this.currentStep() + 1) < this.quiz().questions.length) {
        this.currentStep.update(value => value + 1);
        this.playService.setStatus('play');
        this.questionComponent().resetChoice();
      } else {
        //last step
        this.playService.setStatus('final');

        const quizId = this.quiz().id;

        if(quizId){
          this.playService.submitAnswers(quizId, this.answers()).subscribe();
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
    this.playService.setStatus('check');
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
      this.playService.setStatus('play');
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
    if (this.playService.getPlayState() === 'check') {
      this.nextQuestion();
    } else {
      this.validateQuiz();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.playService.getPlayState() === 'play') {
      // this.playService.clearGuestSession();
      $event.preventDefault();
    }
  }
}
