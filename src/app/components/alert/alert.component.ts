import { NgClass } from '@angular/common';
import { Component, effect, input } from '@angular/core';

type AlertLevel = 'info' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  timeoutId: any;

  level = input<AlertLevel>();

  display = input<boolean>();

  displayStatus: boolean | undefined = true;

  constructor() {
    effect(() => {
      this.displayStatus = this.display();

      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.displayStatus = false;
      }, 3000);
    });
  }
}
