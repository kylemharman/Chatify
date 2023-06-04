/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export const PASSWORD_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordInputComponent),
  multi: true,
};

@Component({
  selector: 'auth-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PASSWORD_INPUT_VALUE_ACCESSOR],
})
export class PasswordInputComponent implements ControlValueAccessor {
  password = new FormControl('', { nonNullable: true });
  showPassword = false;
  disabled = signal(false);
  onChange = (_value: string) => {};
  onTouched = () => {};

  @Input() set value(value: string) {
    if (value) {
      this.password.setValue(value);
    }
  }

  @Input()
  set errors(errors: ValidationErrors | null) {
    this.password.setErrors(errors);
  }

  constructor() {
    this.password.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(password: string): void {
    this.password.setValue(password);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }
}
