import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable } from 'rxjs';
import { QuizInfo } from '../../types/quiz-info';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQueueList } from '@ng-icons/heroicons/outline';
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, AsyncPipe, I18nPluralPipe, QuizListItemComponent],
  providers: [ provideIcons({ heroQueueList }) ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  quizService = inject(QuizService);

  quizzes$ : Observable<QuizInfo[]> = new Observable<QuizInfo[]>();

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
  }

}
