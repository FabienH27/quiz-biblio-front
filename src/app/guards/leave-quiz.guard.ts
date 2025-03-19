import { CanDeactivateFn } from '@angular/router';
import { PlayQuizComponent } from '../pages/play-quiz/play-quiz.component';

export const leaveQuizGuard: CanDeactivateFn<PlayQuizComponent> = (component) => {
  if(component.isQuizInProgress){
    return window.confirm('You have an ongoing quiz. Do you really want to leave?');
  }
  return true;
};
