import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'landing-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private _router = inject(Router);

  async navigate(location: string): Promise<void> {
    await this._router.navigateByUrl(location);
  }
}
