import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  recaptchaFormControl = new FormControl('', [Validators.required]);

  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  public isValid(): boolean {
    if (this.emailFormControl.invalid) return false;
    if (this.recaptchaFormControl.invalid) return false;
    return true;
  }

  public requestPasswordReset(){

  }

}
