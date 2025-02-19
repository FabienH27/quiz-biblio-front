import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFinalStepComponent } from './play-final-step.component';

describe('PlayFinalStepComponent', () => {
  let component: PlayFinalStepComponent;
  let fixture: ComponentFixture<PlayFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayFinalStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayFinalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
