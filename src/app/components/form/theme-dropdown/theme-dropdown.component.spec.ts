import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDropdownComponent } from './theme-dropdown.component';
import { appConfig } from '../../../app.config';
import { ThemeDropdownHostComponent } from './specs/theme-dropdown-host.component';

describe('ThemeDropdownComponent', () => {
  let component: ThemeDropdownComponent;
  let fixture: ComponentFixture<ThemeDropdownHostComponent>;
  let hostComponent: ThemeDropdownHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDropdownHostComponent],
      providers: [
        appConfig.providers
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
