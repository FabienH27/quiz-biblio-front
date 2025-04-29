import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroExclamationTriangle, heroPlus, heroQueueList } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';
import { Observable } from 'rxjs';
import { ModalComponent } from "../../components/modal/modal.component";
import { QuizListItemComponent } from "../../components/quiz-list-item/quiz-list-item.component";
import { QuizService } from '../../services/quiz.service';
import { RbacService } from '../../services/rbac.service';
import { QuizInfo } from '../../types/quiz-info';
import { Roles } from '../../types/roles';

@Component({
    selector: 'app-admin',
    imports: [NgIconComponent, RouterLink, RouterLinkActive, AsyncPipe, QuizListItemComponent, ModalComponent, TranslocoPipe],
    providers: [provideIcons({ heroPlus, heroQuestionMarkCircleSolid, heroQueueList, heroExclamationTriangle })],
    templateUrl: './creation-panel.component.html',
    styleUrl: './creation-panel.component.css'
})
export class CreationPanelComponent implements OnInit {

  private quizService = inject(QuizService);
  private rbacService = inject(RbacService);

  quizList!: Observable<QuizInfo[]>;

  allowImport = false;

  isDeleteModalOpen = false;

  quizToDelete: QuizInfo = {} as QuizInfo;

  userRole: Signal<string | null | undefined> = toSignal(this.rbacService.userRole$);

  get isAdmin(){
    return this.userRole() === Roles.ADMINISTRATOR;
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
