import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

export const deactGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {
  // return true;
  return component.confirmcheck();
};
