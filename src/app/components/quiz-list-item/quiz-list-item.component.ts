import { AsyncPipe, I18nPluralPipe, NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlayCircle, heroQueueList, heroTrash } from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { QuizInfo } from '../../types/quiz-info';

@Component({
    selector: 'app-quiz-list-item',
    imports: [NgIconComponent, I18nPluralPipe, RouterLink, NgClass, AsyncPipe],
    providers: [provideIcons({ heroQueueList, heroTrash, heroPlayCircle })],
    templateUrl: './quiz-list-item.component.html',
    styleUrl: './quiz-list-item.component.css'
})
export class QuizListItemComponent implements OnInit {

  private imageService = inject(ImageService);

  quiz = input.required<QuizInfo>();
  targetRoute = input.required<string[]>();

  displayAction = input<boolean>(false);
  delete = output<QuizInfo>();

  color = input<'dark' | 'lighter'>('lighter');

  imageUrl$!: Observable<string | null>;

  ngOnInit() {
    this.imageUrl$ = this.imageService.getImageUrl(this.quiz().imageId);
  }

  get quizData() {
    return this.quiz();
  }

  playQuiz(event: Event){
    event.stopPropagation();
    event.preventDefault();

  }

  deleteQuiz(event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.delete.emit(this.quiz());
  }

  getPlayQuizUrl(){
    return `/play/${this.quiz().id}`;
  }

}
