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
  standalone: true,
  imports: [QuizFormComponent, AsyncPipe, RouterLink],
  templateUrl: './quiz-edition.component.html',
  styleUrl: './quiz-edition.component.scss'
})
export class QuizEditionComponent {

  quizService = inject(QuizService);
  alertService = inject(AlertService);

  quiz$ = signal<Observable<Quiz>>((EMPTY));

  //inputSignal does not work yet with config : withComponentInputBinding
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
