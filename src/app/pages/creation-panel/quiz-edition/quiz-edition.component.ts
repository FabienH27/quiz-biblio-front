import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { QuizFormComponent } from "../../../components/quiz-form/quiz-form.component";
import { AlertService } from '../../../services/alert.service';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../types/quiz';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-quiz-edition',
    imports: [QuizFormComponent, AsyncPipe, RouterLink, TranslocoPipe],
    templateUrl: './quiz-edition.component.html',
    styleUrl: './quiz-edition.component.css'
})
export class QuizEditionComponent {

  quizService = inject(QuizService);
  alertService = inject(AlertService);
  translocoService = inject(TranslocoService);

  quiz$ = signal<Observable<Quiz>>(EMPTY);

  editPlaceholder: string;

  constructor() {
    this.editPlaceholder = this.translocoService.translate('form.edit-quiz');
  }
  

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
