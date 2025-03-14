import { NgClass } from '@angular/common';
import { Component, effect, inject, Signal } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AlertLevel } from '../../types/alert-levels';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-alert',
    imports: [NgClass],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    animations: [
        trigger('alertAnimation', [
            state('visible', style({
                opacity: 1,
                transform: 'translateY(0)',
            })),
            state('hidden', style({
                opacity: 0,
                transform: 'translateY(-20px)',
            })),
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(20px)' }),
                animate('200ms ease-out'),
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
            ])
        ]),
    ]
})
export class AlertComponent {
  timeoutId: any;

  alertService = inject(AlertService);

  level: AlertLevel | undefined;

  message: string = '';
  visible: boolean = false;

  alertData: Signal<{level: AlertLevel; message: string;} | null>;

  constructor() {
    this.alertData = toSignal(this.alertService.alert$, { initialValue: null });

    effect(() => {
      const alert = this.alertData();
      if (!alert) return;

      this.level = alert.level;
      this.message = alert.message;
      this.visible = true;

      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => (this.visible = false), 3000);
    });
  }

}
