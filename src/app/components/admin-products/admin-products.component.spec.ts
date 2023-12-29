import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProdcutsComponent } from './admin-products.component';

describe('ProductCarousellComponent', () => {
  let component: AdminProdcutsComponent;
  let fixture: ComponentFixture<AdminProdcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProdcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
