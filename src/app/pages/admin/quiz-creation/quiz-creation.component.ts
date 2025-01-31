import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { QuizFormComponent } from "../../../components/quiz-form/quiz-form.component";
import { Quiz } from '../../../types/quiz';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [QuizFormComponent],
  providers: [provideIcons({ heroPlusCircle, heroBeakerSolid })],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {
  onSubmit(quiz: Quiz) {
    console.log(quiz);
  }
}