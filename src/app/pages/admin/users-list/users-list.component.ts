import { Component, inject } from '@angular/core';
import { DatagridComponent } from "../../../components/datagrid/datagrid.component";
import { UserScoreService } from '../../../services/user-score.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-users-list',
  imports: [DatagridComponent, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  scoreService = inject(UserScoreService);

  rowData$ = this.scoreService.getScores() ?? of([]);

}
