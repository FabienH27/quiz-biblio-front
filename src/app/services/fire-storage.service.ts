import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  private readonly storage: Storage = inject(Storage);
  private injector = inject(EnvironmentInjector);

  getImage(fileName: string): Observable<string> {
    return runInInjectionContext(this.injector, () => {
      const imageRef = ref(this.storage, fileName);

      return from(getDownloadURL(imageRef).then((url) => {
        return url;
      }));
    });
  }
}
