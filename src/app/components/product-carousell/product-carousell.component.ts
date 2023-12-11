import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductsService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'product-carousell',
  templateUrl: './product-carousell.component.html'
})
export class ProductCarousellComponent {
  @ViewChild('scrollArea') scrollArea: ElementRef;
  @Input() category: string;

  _products: Product[] = [];

  constructor(private _productService: ProductsService) { }

  ngAfterViewInit() {
    this._productService.getProductsOfCategory(this.category).subscribe((products) => {
      this._products = products;
    });
  }

  public get products(): Product[] {
    return this._products;
  }

  public get totalNumberOfProdcuts(): number {
    return this._products.length;
  }

  public scrollRight(){
    this.scrollArea.nativeElement.scrollBy({
      top: 0,
      left: (250+15),
      behavior: "smooth",
    });
  }

  public scrollLeft(){
    this.scrollArea.nativeElement.scrollBy({
      top: 0,
      left: -(250+15),
      behavior: "smooth",
    });
  }
}
