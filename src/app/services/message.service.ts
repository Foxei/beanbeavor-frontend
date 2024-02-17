import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

  
    constructor(private snackbar: MatSnackBar) {
    };

    private configSuccess: MatSnackBarConfig = {
        panelClass: ['style-success'],
        duration: 2000
    };

    private configError: MatSnackBarConfig = {
        panelClass: ['style-error'],
        duration: 2000
    };

    public snackbarSuccess(message: string) {
        this.snackbar.open(message, 'Close', this.configSuccess);
    }

    public snackbarError(message: string) {
        this.snackbar.open(message, 'Close', this.configError);
    }

}