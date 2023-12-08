import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCarousellComponent } from './product-carousell.component';

describe('ProductCarousellComponent', () => {
  let component: ProductCarousellComponent;
  let fixture: ComponentFixture<ProductCarousellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCarousellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarousellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
