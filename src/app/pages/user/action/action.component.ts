import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthenticationService} from "src/app/services/authentication.service";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  params: Params = [];
  mode: 'user' | 'register' | 'login' | 'forgotPassword' | 'resetPassword' | 'emailVerified' | 'verificationEmailSend' | 'verifyEmail' | 'invalidCode' | 'unknownError' = 'login';
  oobCode: string = '';

  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]);

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      this._UpdateMode();
      this.authenticationService.authenticationState.subscribe(user => {
        if(this.mode == "login" || this.mode == "register"  || this.mode == "forgotPassword" || this.mode == "user") this._UpdateMode();;
      });
    });
  }

  private _UpdateMode() {
    this.mode = 'login';
    this.oobCode = '';
    if ('mode' in this.params) {
      this.mode = this.params['mode'];
    }
    if ('oobCode' in this.params) {
      this.oobCode = this.params['oobCode'];
    }
    if (this.mode == 'verifyEmail') {
      this.authenticationService.applyActionCode(this.oobCode).then(() => {
        this.authenticationService.signOut();
        this.mode = 'emailVerified';
      }).catch(() => {
        this.mode = 'invalidCode';
      });
    } else if (this.mode == 'user' && !this.authenticationService.isSignedIn) {
      this.mode = 'login';
    } else if (this.mode == 'login' && this.authenticationService.isSignedIn) {
      this.mode = 'user';
    } else if (this.mode == 'register' && this.authenticationService.isSignedIn) {
      this.mode = 'user';
    } else if (this.mode == 'forgotPassword' && this.authenticationService.isSignedIn) {
      this.mode = 'user';
    }
  }
}
