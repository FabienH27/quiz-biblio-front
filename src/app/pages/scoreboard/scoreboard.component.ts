import { Component, inject, OnInit } from '@angular/core';
import { ScoreTableComponent } from "../../components/score-table/score-table.component";
import { UserScore } from '../../types/user-score';
import { Observable } from 'rxjs';
import { UserScoreService } from '../../services/user-score.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [ScoreTableComponent, AsyncPipe],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit {

  scoreService = inject(UserScoreService);
  $userScores!: Observable<UserScore[]>;

  ngOnInit(): void {
    this.$userScores = this.scoreService.getScores();
  }

}
