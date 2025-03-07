import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPhoto } from '@ng-icons/heroicons/outline';
import { ImageService } from '../../../services/image.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-selection',
  standalone: true,
  imports: [NgIcon, NgClass],
  providers: [provideIcons({heroPhoto})],
  templateUrl: './image-selection.component.html',
  styleUrl: './image-selection.component.scss'
})
export class ImageSelectionComponent implements OnInit {

  private imageService = inject(ImageService);

  @Input() color: 'primary' | 'secondary' = 'primary';

  @Input() iconSize: string = '5em';

  @Input() imageId: string | null = null;

  @Output() imageUrlChange: EventEmitter<string> = new EventEmitter();

  private selectedFile : File | null = null;

  imageUrl = signal('');

  get imageSource(){
    const imageUrl = this.imageUrl();

    return imageUrl ? environment.bucketUrl + this.imageUrl() : null;
  }

  ngOnInit(): void {
    if(this.imageId){
      this.loadImage(this.imageId);
    }
  }

  handleFileInput(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];

      this.imageService.uploadImage(this.selectedFile)
        .subscribe(response => {
          if(response.id){
            this.imageUrl.set(response.url);
            this.imageUrlChange.emit(response.id);
          }
        })
    }
  }

  loadImage(imageId: string){
    this.imageService.getImage(imageId).subscribe(response => {
      this.imageUrl.set(response.url);
    })
  }
}
