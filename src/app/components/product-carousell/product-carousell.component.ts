import { Component, Input, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ProductsService, Product } from 'src/app/services/product.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'product-carousell',
  templateUrl: './product-carousell.component.html'
})
export class ProductCarousellComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  @ViewChild('scrollArea') scrollArea: ElementRef;

  @Input() category: string;

  _products: Product[] = [];
  _displayedProducts: Product[] = [];

  constructor(private _productService: ProductsService, private _media: MediaObserver) { }

  ngOnInit(): void {
    this._media.asObservable().pipe().subscribe((change: MediaChange[]) => {
      change.forEach(mediaChange => {
        if (mediaChange.mqAlias == "lg") {
          this.paginator.pageSize = 4;
          this.updatePaginatedObject();
        } else if (mediaChange.mqAlias == "md") {
          this.paginator.pageSize = 3;
          this.updatePaginatedObject();
        } else if (mediaChange.mqAlias == "sm") {
          this.paginator.pageSize = 2;
          this.updatePaginatedObject();
        } else if (mediaChange.mqAlias == "xs") {
          this.paginator.pageSize = 1;
          this.updatePaginatedObject();
        }
      });

    });

  }

  public updatePaginatedObject() {
    const index = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const distanceToEnd = this._products.length - ((index + 1) * size);
    const iterations = size;
    const shift = Math.min(distanceToEnd, 0);

    this._displayedProducts = this._displayedProducts.slice(0, size);
    for (let i = 0; i < iterations; i++) {
      let targetIndex = i + (index * size) + shift;
      this._displayedProducts[i] = this._products[targetIndex];
    }
  }

  ngAfterViewInit() {
    // Pull all products of a specific category to product carousell
    this._productService.getProductsOfCategory(this.category).subscribe((products) => {
      for (let i = 0; i < products.length; i++) {
        if (this._products.length - 1 < i) {
          this._products.push(products[i]);
        } else if (this._products[i].id != products[i].id) {
          this._products[i] = products[i];
        } 
      }
      this.updatePaginatedObject();
    });

    // Listen for the paginator to show the correct products
    this.paginator.page.pipe(tap(() => this.updatePaginatedObject())).subscribe();
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
