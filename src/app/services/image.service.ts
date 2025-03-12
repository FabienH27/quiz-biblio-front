import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { UploadResult } from '../types/upload-result';
import { ImageResponse } from '../types/image-response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  uploadImage(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<UploadResult>(`${this.baseUrl}/ImageStorage/upload`, formData, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }))
  }

  getImage(imageId: string): Observable<ImageResponse> {
    return this.httpClient.get<ImageResponse>(`${this.baseUrl}/ImageStorage/${imageId}`, { withCredentials: true })
      .pipe(catchError(err => { console.error(err); throw err }));
  }

  constructUrl(path: string){
    return environment.bucketUrl + path;
  }

}
