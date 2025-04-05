import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditionComponent } from './quiz-edition.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('QuizEditionComponent', () => {
  let component: QuizEditionComponent;
  let fixture: ComponentFixture<QuizEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizEditionComponent],
      providers: [
        appConfig.providers,
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
