import { CanDeactivateFn } from '@angular/router';
import { PlayQuizComponent } from '../pages/play-quiz/play-quiz.component';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export const leaveQuizGuard: CanDeactivateFn<PlayQuizComponent> = (component) => {
  const translocoService = inject(TranslocoService); 

  if(component.isQuizInProgress){
    return window.confirm(translocoService.translate('play.ongoing-quiz'));
  }
  return true;
};
