import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "src/app/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]);
  usernameFormControl = new FormControl('', [Validators.required, Validators.pattern('(^[a-zA-Z0-9äÄüÜöÖ ]{2,30}$)')]);

  constructor(private _authenticationService: AuthenticationService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public isValid(): boolean {
    if (this.emailFormControl.invalid) return false;
    if (this.passwordFormControl.invalid) return false;
    if (this.usernameFormControl.invalid) return false;
    return true;
  }

  public register(): void {
    if (!this.isValid()) return;
    this._authenticationService.signUp(this.emailFormControl.value!, this.passwordFormControl.value!, this.usernameFormControl.value!).then(res => {
      //TODO Redirect on success
      console.log('success');
    }).catch(err => {
      this.passwordFormControl.setValue("");
      this._snackBar.open("Das hat leider nicht geklappt.", "Schließen", {
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    });
  }

}
