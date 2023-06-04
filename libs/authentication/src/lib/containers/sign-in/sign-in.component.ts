import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

@Component({
  selector: 'auth-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _auth = inject(AuthenticationService);

  signInForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.signInForm.controls.email;
  }

  get password() {
    return this.signInForm.controls.password;
  }

  async signIn(): Promise<void> {
    if (this.signInForm.invalid) return;
    await this._auth.signInWithEmail(this.email.value, this.password.value);
  }

  async signInWithGoogle(): Promise<void> {
    await this._auth.signInWithAuthProvider(new GoogleAuthProvider());
  }

  async resetPassword(): Promise<void> {
    await this._router.navigateByUrl('reset-password');
  }
}
