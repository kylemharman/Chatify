import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-google-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleButtonComponent {
  @Input({ required: true }) label = '';
  @Output() googleAuthenticate = new EventEmitter<void>();
}
