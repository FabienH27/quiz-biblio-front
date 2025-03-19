import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../../app.config';
import { ProposalHostComponent } from './specs/proposal-host.component';

describe('ProposalFormComponent', () => {
  let fixture: ComponentFixture<ProposalHostComponent>;
  let hostComponent: ProposalHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalHostComponent],
      providers: [
        appConfig.providers,
        provideHttpClientTesting(),
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
