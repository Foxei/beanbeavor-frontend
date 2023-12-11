import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { MatButton } from "@angular/material/button";
import { FileUploadService, UploadableFile } from "src/app/services/file-upload.service";
import { Category, Image, Product, ProductsService } from 'src/app/services/product.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.max(999), Validators.min(0)]),
    category: new FormControl(this.data.category, [Validators.required]),
    enabled: new FormControl(false, [])
  });

  _categories: Category[] = [];


  selectedImage: UploadableFile = { preview: "", url: "", file: null, uploadProgress: 0 };

  @ViewChild(MatButton) selectImagesButton!: MatButton;

  constructor(public snackBarRef: MatBottomSheetRef<UploadComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fileUploadService: FileUploadService,
    private productService: ProductsService,
    private elementRef: ElementRef) {
    this.productService.categories$.subscribe((categories) => {
      this._categories = categories;
    });
  }

  public get valid(): boolean {
    this.form.controls['image'].setValue(this.selectedImage.file ? this.selectedImage.file.name : "");
    return this.form.valid;
  }

  public get categories(): Category[] {
    return this._categories;
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
    this.uploadAsset();
  }

  private uploadAsset() {
    this.fileUploadService.uploadFile(this.selectedImage).then(() => {
      let image: Image = { url: this.selectedImage.url, name: this.selectedImage.file!.name };

      const product = this.form.value as Partial<Product>;
      product.image = image;
      
      this.productService.addProduct(product).then(() => {
        this.snackBarRef.dismiss();
      });
    })
  }
}
