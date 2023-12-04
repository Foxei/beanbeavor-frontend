import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from "src/app/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern('((?!embedded).)*')]);
  public passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private _router: Router, private _authenticationService: AuthenticationService, private _snackBar: MatSnackBar) {
  }

  public isValid(): boolean {
    if (this.emailFormControl.invalid) return false;
    if (this.passwordFormControl.invalid) return false;
    return true;
  }

  public login(): void {
    if (!this.isValid()) return;
    this._authenticationService.signIn(this.emailFormControl.value!, this.passwordFormControl.value!).then(() => {
    }).catch(e => {
      this.passwordFormControl.setValue("");
      this._snackBar.open(e.message, "Schließen", {
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    }).catch(() => {
      this.passwordFormControl.setValue("");
      this._snackBar.open("Eine unbekannter Fehler ist aufgetreten.", "Schließen", {
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    });
  }

  loginWithGoogle() {
    this._authenticationService.googleLogin();
  }
}
