import { Component, input } from '@angular/core';
import { UserScore } from '../../types/user-score';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-score-table',
    imports: [TranslocoPipe],
    templateUrl: './score-table.component.html',
    styleUrl: './score-table.component.css'
})
export class ScoreTableComponent {

  scores = input.required<UserScore[]>();

  getRank(rank: number) {
    return (rank + 1).toString().padStart(2, "0");
  }

}
