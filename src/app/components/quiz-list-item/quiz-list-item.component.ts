import { I18nPluralPipe, NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQueueList } from '@ng-icons/heroicons/outline';
import { QuizInfo } from '../../types/quiz-info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-list-item',
  standalone: true,
  imports: [NgIconComponent, I18nPluralPipe, RouterLink, NgClass],
  providers: [ provideIcons({ heroQueueList }) ],
  templateUrl: './quiz-list-item.component.html',
  styleUrl: './quiz-list-item.component.scss'
})
export class QuizListItemComponent {

  quiz = input.required<QuizInfo>();
  targetRoute = input.required<string[]>();
  color = input.required<'dark' | 'lighter'>();

}
