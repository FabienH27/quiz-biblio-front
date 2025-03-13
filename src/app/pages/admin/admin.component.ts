import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus, heroQueueList } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';
import { QuizService } from '../../services/quiz.service';
import { Observable } from 'rxjs';
import { QuizInfo } from '../../types/quiz-info';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";


@Component({
    selector: 'app-admin',
    imports: [NgIconComponent, RouterLink, RouterLinkActive, AsyncPipe, QuizListItemComponent],
    providers: [provideIcons({ heroPlus, heroQuestionMarkCircleSolid, heroQueueList })],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  quizService = inject(QuizService); 

  quizList!: Observable<QuizInfo[]>;

  ngOnInit(): void {
    this.quizList = this.quizService.getUserQuizzes();
  }


}
