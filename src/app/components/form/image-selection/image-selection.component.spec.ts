import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectionComponent } from './image-selection.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('ImageSelectionComponent', () => {
  let component: ImageSelectionComponent;
  let fixture: ComponentFixture<ImageSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSelectionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
        provideTransloco({
          config: { 
            availableLangs: ['en', 'fr'],
            defaultLang: 'fr',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: false
          },
          loader: TranslocoHttpLoader
      }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
