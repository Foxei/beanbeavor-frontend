import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { MatButton } from "@angular/material/button";
import { FileUploadService, UploadableFile } from "src/app/services/file-upload.service";
import { Image, Product, ProductsService } from 'src/app/services/product.service';
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
    price: new FormControl('', [Validators.required, Validators.max(999), Validators.min(0)])
  });

  selectedImage: UploadableFile = { preview: "", url: "", file: null, uploadProgress: 0 };

  @ViewChild(MatButton) selectImagesButton!: MatButton;

  constructor(public snackBarRef: MatBottomSheetRef<UploadComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fileUploadService: FileUploadService,
    private productService: ProductsService,
    private elementRef: ElementRef) {
  }

  public get valid(): boolean {
    this.form.controls['image'].setValue(this.selectedImage.file?this.selectedImage.file.name:"");
    return this.form.valid;
  }

  public select(event: any): void {
    const file = event.target.files[0];
    this.selectedImage.file = file;
    const reader = new FileReader();
    reader.onload = (e: any) => { this.selectedImage.preview = e.target.result; }
    reader.readAsDataURL(file);
  }

  public onSubmitForm(): void {
    if (!this.valid){return;}
    this.form.disable();
    this.uploadAsset();
  }

  private uploadAsset() {
    this.fileUploadService.uploadFile(this.selectedImage).then(() => {
      let image: Image = { url: this.selectedImage.url, name: this.selectedImage.file!.name };

      const product = this.form.value as Partial<Product>;
      product.image = image;
      this.productService.addProduct(product).then(() => {
        this.form.reset()
        this.selectedImage.file = null;
        this.selectedImage.preview = "";
        this.selectedImage.uploadProgress = 0;
        this.selectedImage.url = "";
        this.form.enable();
        this.snackBarRef.dismiss();

        // this.snackBar.open("Upload complete. Product is now availabe.", "Close")
      });
    })
  }
}
