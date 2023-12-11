import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Category, ProductsService } from 'src/app/services/product.service';

export interface ChangeProductCategoryComponentDate {
  name: string;
  id: string;
  category: string;
}

@Component({
  selector: 'bb-change-product-category',
  templateUrl: './change-product-category.component.html'
})

export class ChangeProductCatgoryComponent {
  @ViewChild('input') input: ElementRef;

  _categories: Category[] = [];
  form = new FormGroup({
    category: new FormControl(this.data.category, [Validators.required])
  });

  constructor(public snackBarRef: MatBottomSheetRef<ChangeProductCatgoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ChangeProductCategoryComponentDate, private productService: ProductsService) {
      this.productService.categories$.subscribe((categories) => {
        this._categories = categories;
      });
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }


  public get valid(): boolean {
    return this.form.valid;
  }

  public get name(): string {
    return this.data.name;
  }

  public get category(): string {
    return this.data.category;
  }

  public get categories(): Category[] {
    return this._categories;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.snackBarRef.dismiss();
    this.productService.changeProductCategory(this.data.id, this.form.value['category']!);
  }
}
