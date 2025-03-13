import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable } from 'rxjs';
import { QuizInfo } from '../../types/quiz-info';
import { AsyncPipe } from '@angular/common';
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";

@Component({
    selector: 'app-home',
    imports: [AsyncPipe, QuizListItemComponent],
    providers: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  quizService = inject(QuizService);

  quizzes$ : Observable<QuizInfo[]> = new Observable<QuizInfo[]>();

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
  }

}
