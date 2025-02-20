import { CanDeactivateFn } from '@angular/router';
import { PlayQuizComponent } from '../pages/play-quiz/play-quiz.component';

export const playQuizGuard: CanDeactivateFn<PlayQuizComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.isQuizInProgress){
    return window.confirm('You have an ongoing quiz. Do you really want to leave?');
  }
  return true;
};
