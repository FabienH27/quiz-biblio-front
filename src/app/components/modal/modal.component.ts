import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-modal',
  imports: [NgIcon],
  providers: [provideIcons({heroXCircle})],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  isOpen = input<boolean>(false);

  modalClose = output();

  closeModal(){
    this.modalClose.emit();
  }
}
