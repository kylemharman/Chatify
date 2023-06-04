import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [RouterModule, ToastModule],
  selector: 'chatify-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Chatify';
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.count()}`);
      console.log(`The current double count is: ${this.doubleCount()}`);
    });
  }

  increment() {
    this.count.update((value) => value + 1);
  }
}
