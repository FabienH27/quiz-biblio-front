import { AsyncPipe, I18nPluralPipe, NgClass } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQueueList } from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { QuizInfo } from '../../types/quiz-info';

@Component({
    selector: 'app-quiz-list-item',
    imports: [NgIconComponent, I18nPluralPipe, RouterLink, NgClass, AsyncPipe],
    providers: [provideIcons({ heroQueueList })],
    templateUrl: './quiz-list-item.component.html',
    styleUrl: './quiz-list-item.component.css'
})
export class QuizListItemComponent implements OnInit {

  private imageService = inject(ImageService);

  quiz = input.required<QuizInfo>();
  targetRoute = input.required<string[]>();
  color = input<'dark' | 'lighter'>('lighter');

  imageUrl$!: Observable<string | null>;

  ngOnInit() {
    this.imageUrl$ = this.imageService.getImageUrl(this.quiz().imageId);
  }

  get quizData() {
    return this.quiz();
  }

}
