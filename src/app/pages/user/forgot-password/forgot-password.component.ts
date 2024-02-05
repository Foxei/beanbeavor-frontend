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

  constructor( private _authenticationService: AuthenticationService, private _snackBar: MatSnackBar) { }

  public isValid(): boolean {
    if (this.emailFormControl.invalid) return false;
    return true;
  }

  public requestPasswordReset(){
    if (!this.isValid()) return;
    this._authenticationService.forgotPassword(this.emailFormControl.value!).then(res => {
      this._snackBar.open("If your email is associatied to an existing account we have send you an email.", "Close", {
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    }).catch(err => {
      this.emailFormControl.setValue("");
      this._snackBar.open("Somthing went wrong we could not send you an email.", "Close", {
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    });
  }

}
