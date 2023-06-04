import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  UserCredential,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';
import { AlertMessageService, AlertMessageSeverity } from '@chatify/shared';

export type AuthProvider =
  | GoogleAuthProvider
  | FacebookAuthProvider
  | TwitterAuthProvider
  | GithubAuthProvider;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _afAuth = inject(Auth);
  private _router = inject(Router);
  private _message = inject(AlertMessageService);

  async signInWithEmail(
    email: string,
    password: string
  ): Promise<void | UserCredential> {
    await signInWithEmailAndPassword(this._afAuth, email, password)
      .then(({ user }) => this._router.navigate([`${user.uid}`]))
      .catch((error) => this._displayErrorMessage(error.message));
  }

  async signInWithAuthProvider(provider: AuthProvider): Promise<void> {
    await signInWithPopup(this._afAuth, provider)
      .then(({ user }) => this._router.navigate([`${user.uid}`]))
      .catch((error) => this._displayErrorMessage(error.message));
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await createUserWithEmailAndPassword(this._afAuth, email, password)
      .then(({ user }) => this._router.navigate([`${user.uid}`]))
      .catch((error) => this._displayErrorMessage(error.message));
  }

  async signOut(): Promise<void> {
    await signOut(this._afAuth)
      .catch((error) => this._displayErrorMessage(error.message))
      .finally(() => this._router.navigateByUrl('/'));
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this._afAuth, email)
      .then(() =>
        this._message.displayMessage(
          AlertMessageSeverity.SUCCESS,
          'Email Sent',
          'Check your email to reset password'
        )
      )
      .catch((error) => this._displayErrorMessage(error.message));
  }

  private _displayErrorMessage(message: string): void {
    this._message.displayMessage(AlertMessageSeverity.ERROR, 'Error', message);
  }
}
