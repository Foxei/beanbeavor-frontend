import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ProductsService, Product } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePriceComponent } from 'src/app/components/change-price/change-price.component';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'product-carousell',
  templateUrl: './product-carousell.component.html',
  styleUrls: ['./product-carousell.component.css']
})
export class ProductCarousellComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  
  @Input() category: string = "Food";

  displayedProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  oldSnackbar: any = null;

  constructor(private snackBar: MatSnackBar, private productService: ProductsService, private media: MediaObserver) { }

  ngOnInit(): void {
    this.media.asObservable().pipe().subscribe((change: MediaChange[]) => {
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
    const distanceToEnd = this.displayedProducts.length - ((index + 1) * size);
    const iterations = size;
    const shift = Math.min(distanceToEnd, 0);

    this.paginatedProducts = this.paginatedProducts.slice(0, size);
    for (let i = 0; i < iterations; i++) {
      let targetIndex = i + (index * size) + shift;
      this.paginatedProducts[i] = this.displayedProducts[targetIndex];
    }
  }

  public disableProduct(id: string) {
    this.productService.enableProduct(id, false);
  }

  public enableProduct(id: string) {
    this.productService.enableProduct(id, true);
  }

  public changePrice(id: string, name: string, price: number) {
    // this.snackBar.open("Enter new price for " + id + ": ", 'Submit');
    if (this.oldSnackbar != null) this.oldSnackbar.dismiss();
    this.oldSnackbar = this.snackBar.openFromComponent(ChangePriceComponent, {
      data: [name, id, price]
    });
  }

  ngAfterViewInit() {
    this.productService.getProductsOfCategory(this.category).subscribe((products) => {
      for (let i = 0; i < products.length; i++) {
        if (this.displayedProducts.length - 1 < i) {
          this.displayedProducts.push(products[i]);
        } else if (this.displayedProducts[i].id != products[i].id) {
          this.displayedProducts[i] = products[i];
        } else {
          this.displayedProducts[i].description = products[i].description;
          this.displayedProducts[i].name = products[i].name;
          this.displayedProducts[i].enabled = products[i].enabled;
          this.displayedProducts[i].price = products[i].price;
        }
      }
      this.updatePaginatedObject();
    });

    this.paginator.page.pipe(tap(() => this.updatePaginatedObject())).subscribe();
  }
}
