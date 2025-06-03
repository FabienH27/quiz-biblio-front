import { CanDeactivateFn } from '@angular/router';
import { PlayQuizComponent } from '../pages/play-quiz/play-quiz.component';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { PlayService } from '../services/play.service';

export const leaveQuizGuard: CanDeactivateFn<PlayQuizComponent> = () => {
  const translocoService = inject(TranslocoService); 
  const playService = inject(PlayService);

  if(playService.playState() == 'play'){
    return window.confirm(translocoService.translate('play.ongoing-quiz'));
  }
  return true;
};
