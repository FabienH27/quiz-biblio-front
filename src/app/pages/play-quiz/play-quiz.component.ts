import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../types/quiz';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroForwardSolid, heroPlaySolid, heroCheckSolid } from '@ng-icons/heroicons/solid';
import { PlayQuizQuestionComponent } from '../../components/play-quiz-question/play-quiz-question.component';
import { Answer } from '../../types/answer';
import { PlayFinalStepComponent } from "../../components/play-final-step/play-final-step.component";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-play-quiz',
  standalone: true,
  imports: [NgIconComponent, PlayQuizQuestionComponent, PlayFinalStepComponent, JsonPipe],
  providers: [provideIcons({ heroPlaySolid, heroForwardSolid, heroCheckSolid })],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  @ViewChild('question') questionComponent!: PlayQuizQuestionComponent;

  quiz!: Quiz;

  quizStarted = false;
  checkStep = false;
  finalStep = false;

  readonly currentStep = signal(0);

  answers = signal<Map<string, Answer>>(new Map<string, Answer>());

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ quiz: quizData }) => {
      this.quiz = quizData;
    });
  }

  nextQuestion() {
    if(this.hasAnswered){
      //More questions to proceed
      if((this.currentStep()+1) < this.quiz.questions.length){
        this.currentStep.update(value => value + 1);
        this.checkStep = false;
        this.questionComponent.resetChoice();
      }else{
        this.finalStep = true;
      }
    }
  }

  validate() {
    this.checkStep = true;
  }

  onQuizStart() {
    this.quizStarted = true;
  }

  onAnswerChange(answer: Answer) {
    const updatedAnswers = new Map(this.answers());
    updatedAnswers.set(this.currentStep().toString(), answer); 
    this.answers.set(updatedAnswers);
  }

  get currentQuestion() {
    return this.quiz.questions.at(this.currentStep())!;
  }

  get hasAnswered() {
    return this.answers().has(this.currentStep().toString());
  }

}
