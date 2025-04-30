import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPanelComponent } from './creation-panel.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CreationPanelComponent', () => {
  let component: CreationPanelComponent;
  let fixture: ComponentFixture<CreationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationPanelComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
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
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
