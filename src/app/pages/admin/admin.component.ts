import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ NgIconComponent, RouterLink, RouterLinkActive ],
  providers: [ provideIcons({ heroPlus, heroQuestionMarkCircleSolid }) ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  quizList = [];

}
