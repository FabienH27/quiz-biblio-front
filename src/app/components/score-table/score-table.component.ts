import { Component, input } from '@angular/core';
import { UserScore } from '../../types/user-score';

@Component({
  selector: 'app-score-table',
  standalone: true,
  imports: [],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.scss'
})
export class ScoreTableComponent {

  scores = input.required<UserScore[]>();

  getRank(rank: number) {
    return (rank + 1).toString().padStart(2, "0");
  }

}
