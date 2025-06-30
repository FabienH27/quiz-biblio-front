import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsersSolid, heroChartPieSolid, heroTagSolid } from '@ng-icons/heroicons/solid';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-admin',
  imports: [NgIcon, TranslocoPipe, RouterOutlet, RouterModule],
  providers: [provideIcons({heroUsersSolid, heroChartPieSolid, heroTagSolid})],
  templateUrl: './admin.component.html',
})
export class AdminComponent {}
