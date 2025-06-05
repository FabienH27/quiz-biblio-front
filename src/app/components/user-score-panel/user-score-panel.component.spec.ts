import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScorePanelComponent } from './user-score-panel.component';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Score } from '../../types/guest-score';

describe('UserScorePanelComponent', () => {
  let component: UserScorePanelComponent;
  let fixture: ComponentFixture<UserScorePanelComponent>;

  const score : Score = {currentScore: 0, scoredPoints: 1};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserScorePanelComponent],
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

    fixture = TestBed.createComponent(UserScorePanelComponent);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('score', score);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
