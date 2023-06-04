import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export enum AlertMessageSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  private _message = inject(MessageService);

  displayMessage(
    severity: AlertMessageSeverity,
    summary: string,
    detail: string
  ): void {
    this._message.add({
      severity,
      summary,
      detail,
    });
  }
}
