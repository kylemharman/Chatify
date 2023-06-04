import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-input-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorMessageComponent {
  @Input({ required: true }) message = '';
}
