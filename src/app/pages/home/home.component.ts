import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { AsyncPipe } from '@angular/common';
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";
import { TranslocoPipe } from '@jsverse/transloco';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { QuizItemSkeletonComponent } from "../../components/quiz-list-item/quiz-item-skeleton/quiz-item-skeleton.component";

@Component({
    selector: 'app-home',
    imports: [AsyncPipe, QuizListItemComponent, TranslocoPipe, NgxSkeletonLoaderComponent, QuizItemSkeletonComponent],
    providers: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  quizService = inject(QuizService);

  quizzes$ = this.quizService.quizzes$;
  loading$ = this.quizService.loading$;

  ngOnInit(): void {
    this.quizService.getQuizzes();
  }

}
