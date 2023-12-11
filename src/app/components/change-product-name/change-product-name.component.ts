import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Category, ProductsService } from 'src/app/services/product.service';

export interface ChangeProductNameComponentDate {
  name: string;
  id: string;
}

@Component({
  selector: 'bb-change-product-name',
  templateUrl: './change-product-name.component.html'
})

export class ChangeProductNameComponent {
  @ViewChild('input') private _input: ElementRef;

  public form = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required])
  });

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: ChangeProductNameComponentDate,
    public snackBarRef: MatBottomSheetRef<ChangeProductNameComponent>,
    private productService: ProductsService) {

  }

  public ngAfterViewInit(): void {
    this._input.nativeElement.focus();
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
    this.productService.changeProdcutName(this.data.id, this.form.value['name']!);
  }
}
