import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, filter, Observable, of, switchMap } from 'rxjs';
import { UploadResult } from '../types/upload-result';
import { ImageResponse } from '../types/image-response';
import { FireStorageService } from './fire-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);
  private fireStorage = inject(FireStorageService);

  uploadImage(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<UploadResult>(`${this.baseUrl}/ImageStorage/upload`, formData, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }))
  }

  getImageUrl(imageId: string): Observable<string> {
    return this.httpClient.get<ImageResponse>(`${this.baseUrl}/ImageStorage/${imageId}`, { withCredentials: true })
      .pipe(
        filter(id => !!id),
        switchMap((response) => {
          let url = response.resizedUrl;
          if(!url){
            url = response.originalUrl;
          }
          return this.fireStorage.getImage(url);
        }),
        catchError(err => { console.error(err); throw err })
      );
  }
}
