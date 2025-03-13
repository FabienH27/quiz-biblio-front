import { Component, input } from '@angular/core';
import { UserScore } from '../../types/user-score';

@Component({
    selector: 'app-score-table',
    imports: [],
    templateUrl: './score-table.component.html',
    styleUrl: './score-table.component.css'
})
export class ScoreTableComponent {

  scores = input.required<UserScore[]>();

  getRank(rank: number) {
    return (rank + 1).toString().padStart(2, "0");
  }

}
