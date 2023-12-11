import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductsService } from 'src/app/services/product.service';

export interface ChangeProductPriceComponentDate {
  name: string;
  id: string;
  price: number;
}

@Component({
  selector: 'app-message-card',
  templateUrl: './change-product-price.component.html'
})
export class ChangeProductPriceComponent {
  @ViewChild('input') input: ElementRef;

  form = new FormGroup({
    price: new FormControl(this.data.price, [Validators.required, Validators.max(999), Validators.min(0)])
  });

  constructor(public snackBarRef: MatBottomSheetRef<ChangeProductPriceComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ChangeProductPriceComponentDate, private productService: ProductsService) {
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

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.snackBarRef.dismiss();
    this.productService.changeProductPrice(this.data.id, this.form.value['price']!);
  }
}
