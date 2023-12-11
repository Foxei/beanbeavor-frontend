import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProductCatgoryComponent } from 'src/app/components/change-product-category/change-product-category.component';


describe('ChangePriceComponent', () => {
  let component: ChangeProductCatgoryComponent;
  let fixture: ComponentFixture<ChangeProductCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProductCatgoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProductCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
