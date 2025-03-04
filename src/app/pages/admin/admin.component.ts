import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus, heroQueueList } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';
import { QuizService } from '../../services/quiz.service';
import { Observable } from 'rxjs';
import { QuizInfo } from '../../types/quiz-info';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ NgIconComponent, RouterLink, RouterLinkActive, AsyncPipe, I18nPluralPipe ],
  providers: [ provideIcons({ heroPlus, heroQuestionMarkCircleSolid, heroQueueList }) ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  quizService = inject(QuizService); 

  quizList!: Observable<QuizInfo[]>;

  ngOnInit(): void {
    this.quizList = this.quizService.getUserQuizzes();
  }


}
