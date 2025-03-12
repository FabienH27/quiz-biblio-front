import { AsyncPipe, I18nPluralPipe, NgClass } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQueueList } from '@ng-icons/heroicons/outline';
import { QuizInfo } from '../../types/quiz-info';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { FireStorageService } from '../../services/fire-storage.service';
import { filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-quiz-list-item',
  standalone: true,
  imports: [NgIconComponent, I18nPluralPipe, RouterLink, NgClass, AsyncPipe],
  providers: [provideIcons({ heroQueueList })],
  templateUrl: './quiz-list-item.component.html',
  styleUrl: './quiz-list-item.component.scss'
})
export class QuizListItemComponent implements OnInit {

  private imageService = inject(ImageService);
  private fireStorage = inject(FireStorageService);

  quiz = input.required<QuizInfo>();
  targetRoute = input.required<string[]>();
  color = input.required<'dark' | 'lighter'>();

  imageUrl$!: Observable<string | null>;

  ngOnInit() {
    this.imageUrl$ = this.loadImage();
  }

  loadImage() {
    return this.imageService.getImage(this.quizData.imageId).pipe(
      filter(x => !!x.originalUrl),
      switchMap((response) => {
        let url = response.resizedUrl;
        if (!url) {
          url = response.originalUrl;
        }
        return this.fireStorage.getImage(url);
      })
    );
  }


  get quizData() {
    return this.quiz();
  }

}
