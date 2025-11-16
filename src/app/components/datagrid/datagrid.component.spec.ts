import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridComponent } from './datagrid.component';

describe('DatagridComponent', () => {
  let component: DatagridComponent;
  let fixture: ComponentFixture<DatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatagridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatagridComponent);
    component = fixture.componentInstance;

    const rowData = [
      {score: 10, userId: '1', userName: 'Alice', role: 'ADMIN'},
      {score: 20, userId: '2', userName: 'Bob', role: 'USER'}
    ];

    fixture.componentRef.setInput('rowData', rowData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
