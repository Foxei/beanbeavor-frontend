import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KioskService } from 'src/app/services/kiosk.service';

@Component({
  selector: 'bb-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent {
  @ViewChild('input') input: ElementRef;

  public form = new FormGroup({
    pin: new FormControl('', [Validators.required, Validators.max(999), Validators.min(100)])
  });

  constructor(
    private __kioskService: KioskService,
    private __router: Router
    ) { }

  public inputFilter(event: KeyboardEvent): boolean {
    const key = event.key;

    const keyWhiteList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    if (keyWhiteList.includes(key)) return true;

    if (key == "Enter") {
      this.onSubmitForm();
      return true;
    }

    return false;
  }

  public clearPin() {
    this.form.controls.pin.setValue('');
  }

  public inputDigit(value: number) {
    const pin = this.form.value['pin']! + value.toString();
    this.form.controls.pin.setValue(pin);
  }

  public signInAsCatering() {
    this.clearPin();
    this.inputDigit(1);
    this.inputDigit(0);
    this.inputDigit(0);
    this.onSubmitForm();
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    const pin: number = Number(this.form.value['pin']!);
    this.__kioskService.usersViaPin(pin).then(res => {
     this.__onSignInSucceded();
    }).catch(res => {
      this.__onSignInFailed();
    });
  }

  private __onSignInSucceded() {
    this.__router.navigate(['/home']);
  }

  private __onSignInFailed() {
    this.clearPin();
    this.form.enable();
  }

}