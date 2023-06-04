import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@chatify/authentication';

@Component({
  selector: 'chat-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private _auth = inject(AuthenticationService);

  async signOut(): Promise<void> {
    await this._auth.signOut();
  }
}
