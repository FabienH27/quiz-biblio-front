import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { QuizFormComponent } from "../../../components/quiz-form/quiz-form.component";
import { AlertService } from '../../../services/alert.service';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../types/quiz';


@Component({
    selector: 'app-quiz-edition',
    imports: [QuizFormComponent, AsyncPipe, RouterLink],
    templateUrl: './quiz-edition.component.html',
    styleUrl: './quiz-edition.component.css'
})
export class QuizEditionComponent {

  quizService = inject(QuizService);
  alertService = inject(AlertService);

  quiz$ = signal<Observable<Quiz>>(EMPTY);

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  set id(quizId: string) {
    this.quiz$.set(this.quizService.getQuizById(quizId));
  }

  onQuizEdition(quiz: Quiz){
    this.quizService.editQuiz(quiz).subscribe(() => {
      this.alertService.showAlert('Quiz successfully updated', 'success');
    });
  }


}
