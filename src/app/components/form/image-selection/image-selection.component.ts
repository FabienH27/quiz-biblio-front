import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPhoto } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-image-selection',
  standalone: true,
  imports: [NgIcon, NgClass],
  providers: [provideIcons({heroPhoto})],
  templateUrl: './image-selection.component.html',
  styleUrl: './image-selection.component.scss'
})
export class ImageSelectionComponent {

  @Input() color: 'primary' | 'secondary' = 'primary';

  @Input() iconSize: string = '5em';

}
