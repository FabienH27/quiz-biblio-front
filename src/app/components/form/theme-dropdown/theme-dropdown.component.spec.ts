import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDropdownHostComponent } from './specs/theme-dropdown-host.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('ThemeDropdownComponent', () => {
  let fixture: ComponentFixture<ThemeDropdownHostComponent>;
  let hostComponent: ThemeDropdownHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDropdownHostComponent],
      providers: [
        provideTransloco({
          config: { 
            availableLangs: ['en', 'fr'],
            defaultLang: 'fr',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: false,
          },
          loader: TranslocoHttpLoader
      }),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeDropdownHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
});
