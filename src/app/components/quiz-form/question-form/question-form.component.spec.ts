import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormComponent } from './question-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';
import { QuestionHostComponent } from './specs/question-host.component';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionHostComponent>;
  let hostComponent: QuestionHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionHostComponent],
      providers: [
        appConfig.providers,
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
});
