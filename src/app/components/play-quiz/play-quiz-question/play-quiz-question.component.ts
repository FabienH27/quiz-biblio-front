import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { Question } from '../../../types/quiz';
import { NgClass } from '@angular/common';
import { Answer } from '../../../types/answer';

@Component({
  selector: 'app-play-quiz-question',
  standalone: true,
  imports: [NgClass],
  providers: [],
  templateUrl: './play-quiz-question.component.html',
  styleUrl: './play-quiz-question.component.scss'
})
export class PlayQuizQuestionComponent {

  question = input.required<Question>();
  selectedProposals: number[] = [];

  isValidationStep = input.required<boolean>();

  @Output() answerChange = new EventEmitter<Answer>();

  get isCorrect(){
    return this.selectedProposals.length === this.question().correctProposalIds.length &&
    this.question().correctProposalIds.every(value => this.selectedProposals.includes(value));
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
      return [...baseClass, '!outline-red-500'];
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
