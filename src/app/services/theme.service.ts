import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);
  
  getThemes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/themes`, { withCredentials: true });
  }

  createTheme(themeName: string) {
    return this.httpClient.post(`${this.baseUrl}/themes`, { 'name': themeName }, { withCredentials: true })
  }
}
