import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProductPriceComponent } from 'src/app/components/change-product-price/change-product-price.component';


describe('ChangeProductCatgoryComponent', () => {
  let component: ChangeProductPriceComponent;
  let fixture: ComponentFixture<ChangeProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProductPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
