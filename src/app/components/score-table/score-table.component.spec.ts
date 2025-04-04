import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTableComponent } from './score-table.component';
import { UserScore } from '../../types/user-score';
import { getTranslocoModule } from '../../specs/transloco-testing.module';

describe('ScoreTableComponent', () => {
  let component: ScoreTableComponent;
  let fixture: ComponentFixture<ScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreTableComponent, getTranslocoModule()]
    })
    .compileComponents();

    
    
    fixture = TestBed.createComponent(ScoreTableComponent);
    component = fixture.componentInstance;
    
    const scores : UserScore[] = [{score: 1, userId: 'abc', userName: 'test'}]
    fixture.componentRef.setInput('scores', scores);
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
