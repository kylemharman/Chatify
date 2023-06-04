import { Route } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToSignIn = () => redirectUnauthorizedTo('/sign-in');

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@chatify/landing').then((m) => m.landingRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('@chatify/authentication').then((m) => m.authenticationRoutes),
  },
  {
    path: ':uid',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToSignIn },
    loadChildren: () => import('@chatify/chat').then((m) => m.chatRoutes),
  },
];
