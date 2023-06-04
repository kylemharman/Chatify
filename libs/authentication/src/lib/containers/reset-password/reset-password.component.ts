import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { InputErrorMessageComponent } from '@chatify/shared';
import { ButtonModule } from 'primeng/button';
import { EmailInputComponent } from '../../components/email-input/email-input.component';

@Component({
  selector: 'auth-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    EmailInputComponent,
    InputErrorMessageComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  private _auth = inject(AuthenticationService);

  email = new FormControl('', [Validators.required, Validators.email]);

  async resetPassword(): Promise<void> {
    if (this.email.invalid || !this.email.value) {
      return;
    }
    await this._auth.resetPassword(this.email.value);
  }
}
