import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProposalHostComponent } from './specs/proposal-host.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('ProposalFormComponent', () => {
  let fixture: ComponentFixture<ProposalHostComponent>;
  let hostComponent: ProposalHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalHostComponent],
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
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProposalHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
});
