import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesListComponent } from './themes-list.component';

describe('ThemesListComponent', () => {
  let component: ThemesListComponent;
  let fixture: ComponentFixture<ThemesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
