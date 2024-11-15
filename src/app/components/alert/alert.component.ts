import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  animations: [
    trigger('alertAnimation', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        })
      ),
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
export class AlertComponent implements OnInit {
  timeoutId: any;

  alertService = inject(AlertService);

  level: string | undefined;

  message: string = '';
  visible: boolean = false;

  ngOnInit() {
    this.alertService.alert$.subscribe(({level, message}) => {
      this.level = level;
      this.message = message;
      this.visible = true;

      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.visible = false;
      }, 3000);
    });

  }

}
