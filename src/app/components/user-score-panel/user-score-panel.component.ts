import { Component, input } from '@angular/core';
import { Score } from '../../types/guest-score';
import { TranslocoPipe } from '@jsverse/transloco';
import { BoxInfoComponent } from "../box-info/box-info.component";

@Component({
  selector: 'app-user-score-panel',
  imports: [TranslocoPipe, BoxInfoComponent],
  templateUrl: './user-score-panel.component.html',
  styleUrl: './user-score-panel.component.css'
})
export class UserScorePanelComponent {

  score = input.required<Score>();

}
