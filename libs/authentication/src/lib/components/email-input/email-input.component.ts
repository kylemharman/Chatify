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

export const EMAIL_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmailInputComponent),
  multi: true,
};

@Component({
  selector: 'auth-email-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EMAIL_INPUT_VALUE_ACCESSOR],
})
export class EmailInputComponent implements ControlValueAccessor {
  email = new FormControl('', { nonNullable: true });
  disabled = signal(false);
  onChange = (_value: string) => {};
  onTouched = () => {};

  @Input() set value(value: string) {
    if (value) {
      this.email.setValue(value);
    }
  }

  @Input()
  set errors(errors: ValidationErrors | null) {
    this.email.setErrors(errors);
  }

  constructor() {
    this.email.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(emailAddress: string): void {
    this.email.setValue(emailAddress);
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
