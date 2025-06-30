import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChartPieSolid, heroTagSolid, heroUsersSolid } from '@ng-icons/heroicons/solid';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [NgIcon, TranslocoPipe, RouterOutlet, RouterModule],
  providers: [provideIcons({heroUsersSolid, heroChartPieSolid, heroTagSolid})],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
