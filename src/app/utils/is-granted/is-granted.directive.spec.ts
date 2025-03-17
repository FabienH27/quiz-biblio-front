import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IsGrantedDirective } from './is-granted.directive';
import { TestDirectiveComponent } from './specs/test-directive.component';
import { RbacService } from '../../services/rbac.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('IsGrantedDirective', () => {

  let fixture: ComponentFixture<TestDirectiveComponent>;
  let component: TestDirectiveComponent;

  let mockRbacService: jasmine.SpyObj<RbacService>;

  beforeEach(() => {    
    mockRbacService = jasmine.createSpyObj<RbacService>('RbacService', ['isGranted']);

    fixture = TestBed.configureTestingModule({
      imports: [IsGrantedDirective, TestDirectiveComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: RbacService, useValue: mockRbacService
        }
      ]
    }).createComponent(TestDirectiveComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display protected content', () => {
    mockRbacService.isGranted.and.returnValue(true);
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('a'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toEqual('Admin panel');
    expect(mockRbacService.isGranted).toHaveBeenCalled();
  });

  it('should NOT display protected content', () => {
    mockRbacService.isGranted.and.returnValue(false);
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('a'));
    expect(content).toBeNull();
    expect(mockRbacService.isGranted).toHaveBeenCalled();
  });

});
