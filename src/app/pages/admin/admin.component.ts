import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ NgIconComponent ],
  providers: [ provideIcons({ heroPlus, heroQuestionMarkCircleSolid }) ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
