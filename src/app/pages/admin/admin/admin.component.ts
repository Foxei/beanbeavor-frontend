import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ProductsService, Product } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeProductPriceComponent } from 'src/app/components/change-product-price/change-product-price.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChangeProductCatgoryComponent } from 'src/app/components/change-product-category/change-product-category.component';
import { ChangeProductNameComponent } from 'src/app/components/change-product-name/change-product-name.component';
import { ChangeProductDescriptionComponent } from 'src/app/components/change-product-description/change-product-description.component';
import { UploadableFile } from 'src/app/services/file-upload.service';
import { ChangeProductImageComponent } from 'src/app/components/change-product-image/change-product-image.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  displayedColumns: string[] = ['picture', 'name', 'description', 'price', 'category', 'actions'];
  products: Product[] = [];
  dataSource = new MatTableDataSource(this.products);

  constructor(private bottomSheet: MatBottomSheet, private productService: ProductsService) { }

  public disableProduct(product: Product) {
    const id = product.id;
    this.productService.enableProduct(id, false);
  }

  public enableProduct(product: Product) {
    const id = product.id;
    this.productService.enableProduct(id, true);
  }

  public uploadNewProduct() {
    this.bottomSheet.open(UploadComponent, {
      data: []
    });
  }

  public changePrice(product: Product) {
    const name = product.name;
    const id = product.id;
    const price = product.price;
    this.bottomSheet.open(ChangeProductPriceComponent, {
      data: { name, id, price }
    });
  }

  public changeCategory(product: Product) {
    const name = product.name;
    const id = product.id;
    const category = product.category;
    this.bottomSheet.open(ChangeProductCatgoryComponent, {
      data: { name, id, category }
    });
  }

  public changeImage(product: Product) {
    const name = product.name;
    const id = product.id;
    this.bottomSheet.open(ChangeProductImageComponent, {
      data: { name, id }
    });
  }

  public changeName(product: Product) {
    const name = product.name;
    const id = product.id;
    this.bottomSheet.open(ChangeProductNameComponent, {
      data: { name, id }
    });
  }

  public changeDescription(product: Product) {
    const name = product.name;
    const id = product.id;
    const description = product.description;
    this.bottomSheet.open(ChangeProductDescriptionComponent, {
      data: { name, id, description }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.productService.products$.subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

