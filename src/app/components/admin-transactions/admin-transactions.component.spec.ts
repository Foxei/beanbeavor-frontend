import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTransctionsComponent } from './admin-transactions.component';

describe('ProductCarousellComponent', () => {
  let component: AdminTransctionsComponent;
  let fixture: ComponentFixture<AdminTransctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
