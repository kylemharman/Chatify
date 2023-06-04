import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { InputErrorMessageComponent } from '@chatify/shared';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';

@Component({
  selector: 'auth-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private _fb = inject(FormBuilder);
  private _auth = inject(AuthenticationService);
  readonly passwordMinLength = 6;
  readonly passwordMaxLength = 30;

  signUpForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ],
    ],
  });

  get email() {
    return this.signUpForm.controls.email;
  }

  get password() {
    return this.signUpForm.controls.password;
  }

  async signUpWithGoogle(): Promise<void> {
    await this._auth.signInWithAuthProvider(new GoogleAuthProvider());
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) {
      return;
    }
    await this._auth.signUpWithEmailAndPassword(
      this.email.value,
      this.password.value
    );
  }
}
