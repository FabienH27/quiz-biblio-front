import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../types/quiz';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { PlayQuizQuestionComponent } from '../../components/play-quiz-question/play-quiz-question.component';

@Component({
  selector: 'app-play-quiz',
  standalone: true,
  imports: [NgIconComponent, PlayQuizQuestionComponent],
  providers: [provideIcons({heroPlaySolid})],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  quiz!: Quiz;
  
  quizStarted = false;
  currentStep = signal(0);
  answers = new Map<string, string>();


  ngOnInit() {
    this.activatedRoute.data.subscribe(({quiz: quizData}) => {
      this.quiz = quizData;
    });
  }

  nextQuestion(){
    console.log("next");
  }

  onQuizStart(){
    this.quizStarted = true;
  }

}
