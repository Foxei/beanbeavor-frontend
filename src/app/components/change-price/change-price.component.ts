import { Component, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.css']
})
export class ChangePriceComponent {
  form = new FormGroup({
    price: new FormControl(this.data[2], [Validators.required, Validators.max(999), Validators.min(0)])
  });

  constructor(public snackBarRef: MatSnackBarRef<ChangePriceComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any, private productService: ProductsService,
    private elementRef: ElementRef) {
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.snackBarRef.dismiss();
    this.productService.changeProductPrice(this.data[1], this.form.value['price']);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
      this.snackBarRef.dismiss();
     }
  }
}
