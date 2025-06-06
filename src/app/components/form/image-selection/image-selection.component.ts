import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowUpTray, heroExclamationTriangle, heroPhoto, heroTrash } from '@ng-icons/heroicons/outline';
import { filter, Observable, switchMap } from 'rxjs';
import { ImageService } from '../../../services/image.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-image-selection',
    imports: [NgIcon, NgClass, AsyncPipe, TranslocoPipe],
    providers: [provideIcons({ heroPhoto, heroArrowUpTray, heroTrash, heroExclamationTriangle })],
    templateUrl: './image-selection.component.html',
    styleUrl: './image-selection.component.css'
})
export class ImageSelectionComponent implements OnInit {

  private imageService = inject(ImageService);

  color = input<'primary' | 'secondary'>('primary');

  iconSize = input<string>('5em');

  imageId = input<string | null>(null);

  imageUrlChange = output<string | null>();

  private selectedFile: File | null = null;

  imageUrlSignal = signal<string | null>('');

  imageUrl$: Observable<string>;

  constructor() {
    this.imageUrl$ = toObservable(this.imageUrlSignal).pipe(
      filter(value => value != null),
      switchMap(value => this.imageService.getImageUrl(value))
    );
  }

  ngOnInit(): void {
    if (this.imageId) {
      this.imageUrlSignal.set(this.imageId());
    }
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      this.uploadImage(this.selectedFile);
    }
  }

  removeImage() {
    this.imageUrlSignal.set(null);
    this.imageUrlChange.emit(null);
  }

  uploadImage(file: File) {
    this.imageService.uploadImage(file)
      .subscribe(response => {
        if (response.id) {
          this.imageUrlSignal.set(response.id);
          this.imageUrlChange.emit(response.id);
        }
      });
  }
}
