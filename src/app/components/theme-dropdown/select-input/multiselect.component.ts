import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowDown, heroArrowUp } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, NgIf, NgIcon, NgClass],
  providers: [provideIcons({ heroArrowDown, heroArrowUp })],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
})
export class MultiSelectComponent {

  private elementRef = inject(ElementRef);

  @Input() isDropdownOpen = false;

  @Input() options: string[] = [];
  selectedOptions: string[] = [];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleOption(option: string) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(o => o !== option);
    } else {
      this.selectedOptions.push(option);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

}
