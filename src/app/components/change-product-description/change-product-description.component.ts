import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductsService } from 'src/app/services/product.service';

export interface ChangeProductDescriptionComponentDate {
  name: string;
  id: string;
  description: string;
}

@Component({
  selector: 'bb-change-product-description',
  templateUrl: './change-product-description.component.html'
})

export class ChangeProductDescriptionComponent {
  @ViewChild('input') private _input: ElementRef;

  public form = new FormGroup({
    description: new FormControl(this.data.description, [Validators.required])
  });

  constructor(
    public snackBarRef: MatBottomSheetRef<ChangeProductDescriptionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: ChangeProductDescriptionComponentDate,
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

  public get description(): string {
    return this.data.description;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.snackBarRef.dismiss();
    this.productService.changeProdcutDescription(this.data.id, this.form.value['description']!);
  }
}
