import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FileUploadService, UploadableFile } from 'src/app/services/file-upload.service';
import { Image, ProductsService } from 'src/app/services/product.service';

export interface ChangeProductImageComponentDate {
  name: string;
  id: string;
}

@Component({
  selector: 'app-change-product-image',
  templateUrl: './change-product-image.component.html'
})
export class ChangeProductImageComponent {
  @ViewChild('input') input: ElementRef;

  form = new FormGroup({
    image: new FormControl('', [Validators.required]),
  });

  selectedImage: UploadableFile = { preview: "", url: "", file: null, uploadProgress: 0 };

  constructor(public snackBarRef: MatBottomSheetRef<ChangeProductImageComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ChangeProductImageComponentDate,
    private productService: ProductsService,
    private fileUploadService: FileUploadService) {
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  public get valid(): boolean {
    this.form.controls['image'].setValue(this.selectedImage.file ? this.selectedImage.file.name : "");
    return this.form.valid;
  }

  public get name(): string {
    return this.data.name;
  }

  public select(event: any): void {
    const file = event.target.files[0];
    this.selectedImage.file = file;
    const reader = new FileReader();
    reader.onload = (e: any) => { this.selectedImage.preview = e.target.result; }
    reader.readAsDataURL(file);
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.productService.changeProductImage(this.data.id, this.selectedImage);
    this.snackBarRef.dismiss();      
  }
}
