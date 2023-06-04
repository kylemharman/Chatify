import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputErrorMessageComponent } from '@chatify/shared';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { AuthenticationActionType } from '@chatify/core';

@Component({
  selector: 'auth-authenticate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    EmailInputComponent,
    PasswordInputComponent,
    InputErrorMessageComponent,
  ],
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticateComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _auth = inject(AuthenticationService);
  readonly passwordMinLength = 6;
  readonly passwordMaxLength = 30;

  @Input({ required: true }) action = AuthenticationActionType.LogIn;

  isSignUp = signal(false);
  isLogIn = signal(false);

  form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isLogIn.set(this.action === AuthenticationActionType.LogIn);
    this.isSignUp.set(this.action === AuthenticationActionType.SignUp);
    this._addSignUpPasswordValidators();
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    if (this.isLogIn()) await this._logIn();
    if (this.isSignUp()) await this._signUp();
  }

  async authenticateWithGoogle(): Promise<void> {
    await this._auth.signInWithAuthProvider(new GoogleAuthProvider());
  }

  async resetPassword(): Promise<void> {
    await this._router.navigateByUrl('reset-password');
  }

  private async _logIn(): Promise<void> {
    await this._auth.signInWithEmail(this.email.value, this.password.value);
  }

  private async _signUp(): Promise<void> {
    await this._auth.signUpWithEmailAndPassword(
      this.email.value,
      this.password.value
    );
  }

  private _addSignUpPasswordValidators(): void {
    if (!this.isSignUp()) return;

    this.form.controls.password.addValidators([
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength),
    ]);
  }
}
