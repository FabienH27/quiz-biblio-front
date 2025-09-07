import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-item-skeleton',
  imports: [],
  templateUrl: './quiz-item-skeleton.component.html',
})
export class QuizItemSkeletonComponent {
  protected fakeArray = Array(5);
}
