import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bb-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent {
  @ViewChild('input') input: ElementRef;

  form = new FormGroup({
    pin: new FormControl('', [Validators.required, Validators.max(999), Validators.min(100)])
  });

  constructor() { }

  ngAfterViewInit(): void {
    // this.input.nativeElement.focus();
  }

  public inputNumber(value: number){
    const pin = this.form.value['pin']! + value.toString();
    this.form.controls.pin.setValue(pin);
  }

  public catering(){
    this.form.controls.pin.setValue('');
    this.inputNumber(1);
    this.inputNumber(0);
    this.inputNumber(0);
    this.onSubmitForm();
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    // this.snackBarRef.dismiss();
    // this.productService.changeProductPrice(this.data.id, this.form.value['price']!);
  }

}