import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ProductsService, Product } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePriceComponent } from 'src/app/components/change-price/change-price.component';

@Component({
  selector: 'app-projects',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  displayedProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  oldSnackbar: any = null;

  constructor(private snackBar: MatSnackBar, private productService: ProductsService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.oldSnackbar != null) this.oldSnackbar.dismiss();
  }

  public updatePaginatedObject() {
    const index = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const distanceToEnd = this.displayedProducts.length - ((index + 1) * size);
    const iterations = size + Math.min(distanceToEnd, 0);

    this.paginatedProducts = this.paginatedProducts.slice(0, iterations);
    for (let i = 0; i < iterations; i++) {
      let targetIndex = i + (index * size);
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
    this.productService.products$.subscribe((products) => {
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

