import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroExclamationTriangle, heroPlus, heroQueueList } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';
import { Observable } from 'rxjs';
import { ModalComponent } from "../../components/modal/modal.component";
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";
import { QuizService } from '../../services/quiz.service';
import { QuizInfo } from '../../types/quiz-info';
import { Roles } from '../../types/roles';
import { User } from '../../types/user';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-admin',
    imports: [NgIconComponent, RouterLink, RouterLinkActive, AsyncPipe, QuizListItemComponent, ModalComponent, TranslocoPipe],
    providers: [provideIcons({ heroPlus, heroQuestionMarkCircleSolid, heroQueueList, heroExclamationTriangle })],
    templateUrl: './creation-panel.component.html',
    styleUrl: './creation-panel.component.css'
})
export class CreationPanelComponent implements OnInit {

  private quizService = inject(QuizService);
  private route = inject(ActivatedRoute);

  user: User = this.route.snapshot.data['user'];

  quizList!: Observable<QuizInfo[]>;

  allowImport = false;

  isDeleteModalOpen = false;

  quizToDelete: QuizInfo = {} as QuizInfo;

  get isAdmin(){
    return this.user.role === Roles.ADMINISTRATOR;
  }

  ngOnInit(): void {
    this.quizList = this.quizService.quizzes$;
    this.quizService.getUserQuizzes();
  }

  openDeleteModal(quiz: QuizInfo){
    this.isDeleteModalOpen = true;
    this.quizToDelete = quiz;
  }

  closeDeletionModal(){
    this.isDeleteModalOpen = false;
  }

  deleteQuiz(){
    this.quizService.deleteQuiz(this.quizToDelete.id).subscribe();
    this.isDeleteModalOpen = false;
  }

}
