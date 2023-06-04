import { Route } from '@angular/router';
import { AuthenticateComponent } from './containers/authenticate/authenticate.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { AuthenticationActionType } from '@chatify/core';

export const authenticationRoutes: Route[] = [
  {
    path: 'log-in',
    component: AuthenticateComponent,
    data: { action: AuthenticationActionType.LogIn },
  },
  {
    path: 'sign-up',
    component: AuthenticateComponent,
    data: { action: AuthenticationActionType.SignUp },
  },
  { path: 'reset-password', component: ResetPasswordComponent },
];
