import { Route } from '@angular/router';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';

export const authenticationRoutes: Route[] = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
