import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPanelComponent } from './creation-panel.component';
import { appConfig } from '../../app.config';

describe('CreationPanelComponent', () => {
  let component: CreationPanelComponent;
  let fixture: ComponentFixture<CreationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationPanelComponent],
      providers: [
        appConfig.providers
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
