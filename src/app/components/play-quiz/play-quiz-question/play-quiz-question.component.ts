import { Component, effect, inject, input, output } from '@angular/core';
import { Question } from '../../../types/quiz';
import { AsyncPipe, NgClass } from '@angular/common';
import { Answer } from '../../../types/answer';
import { Observable, of } from 'rxjs';
import { ImageService } from '../../../services/image.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-play-quiz-question',
    imports: [NgClass, AsyncPipe, TranslocoPipe],
    templateUrl: './play-quiz-question.component.html',
    styleUrl: './play-quiz-question.component.css'
})
export class PlayQuizQuestionComponent {

  private imageService = inject(ImageService);

  question = input.required<Question>();
  selectedProposals: number[] = [];

  isValidationStep = input<boolean>(false);

  readonly answerChange = output<Answer>();

  imageUrl$!: Observable<string | null>;

  get selectionCount(){
    return this.selectedProposals.length;
  }

  get correctSelectionCount(){
    return this.question().correctProposalIds.length;
  }

  get isCorrect(){
    return this.selectionCount === this.question().correctProposalIds.length &&
    this.question().correctProposalIds.every(value => this.selectedProposals.includes(value));
  }

  get hasMultipleCorrectAnswers(){
    return this.question().correctProposalIds.length > 1;
  }

  constructor() {
    effect(() => {
      const imageId = this.question().imageId;

      this.imageUrl$ = imageId ? this.imageService.getImageUrl(imageId) : of(null);
    });
  }

  addToAnswer(proposalIndex: number) {
    if(this.isValidationStep()){
      return;
    }

    if (this.selectedProposals.includes(proposalIndex)) {
      const index = this.selectedProposals.indexOf(proposalIndex);
      this.selectedProposals.splice(index, 1);
    } else {
      this.selectedProposals.push(proposalIndex);
    }

    const answer: Answer = { isCorrect: this.isCorrect, value: this.selectedProposals };

    this.answerChange.emit(answer);
  }

  isAnswerCorrect(index: number) {
    const currentProposal = this.selectedProposals.at(index) ?? -1;

    if (this.question().correctProposalIds.includes(currentProposal)) {
      return true;
    }
    return false;
  }

  getProposalClass(index: number): string[] {
    const baseClass = ['bg-slate-500'];

    if (!this.isValidationStep()) {
      return baseClass;
    }
    
    const correctAnswers = this.question().correctProposalIds;
    const userSelected = this.selectedProposals.includes(index);
    const isCorrect = correctAnswers.includes(index);

    if (isCorrect) {
      return ['bg-teal-500'];
    }

    if (userSelected && !isCorrect) {
      return [...baseClass, 'outline-red-500!'];
    }

    return baseClass;
  }

  resetChoice(){
    this.selectedProposals = [];
  }

  isChecked(index: number): boolean {
    return this.selectedProposals.includes(index);
  }
}
