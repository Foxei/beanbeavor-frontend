import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TransactionItem, TransactionsService } from 'src/app/services/transactions.service';
import { AuthenticationService, User } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-upload',
  templateUrl: './add-transaction.component.html'
})

export class AddTransactionComponent {

  form = new FormGroup({
    product: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.max(999), Validators.min(0)]),
    user: new FormControl('', [Validators.required])
  });

  _users: User[] = [];

  constructor(public snackBarRef: MatBottomSheetRef<AddTransactionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _transactionService: TransactionsService,
    private _userService: AuthenticationService
  ) { }

  ngAfterViewInit() {
    this._userService.users$.subscribe((users) => {
      this._users = users;
    });
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public get users(): User[] {
    return this._users;
  }

  public onSubmitForm(): void {
    if (!this.valid) { return; }
    this.form.disable();
    this.snackBarRef.dismiss();

    const userReference = this._userService.getUserReferenceButID(this.form.value.user!);
    this._transactionService.addTransaction({user: userReference, product: {name: this.form.value.product!, price: Number(this.form.value.price!)}});
  }

}
