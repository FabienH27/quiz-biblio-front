import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { QuizFormComponent } from "../../../components/quiz-form/quiz-form.component";
import { Quiz } from '../../../types/quiz';
import { AlertService } from '../../../services/alert.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
    selector: 'app-quiz-creation',
    imports: [QuizFormComponent],
    providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
    templateUrl: './quiz-creation.component.html',
    styleUrl: './quiz-creation.component.css'
})
export class QuizCreationComponent {

  quizService = inject(QuizService);
  alertService = inject(AlertService);

  onQuizCreation(quiz: Quiz) {
    this.quizService.createQuiz(quiz).subscribe(() => {
      this.alertService.showAlert('Quiz successfully created', 'success');
    });
  }
}