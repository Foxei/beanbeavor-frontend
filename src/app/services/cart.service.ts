import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Product } from './product.service';
import { interval } from 'rxjs';

export interface ShoppingCart {
    id: string;
    creationTime: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {

    _products$: Product[] = [];
    audio: HTMLAudioElement = new Audio('../assets/ui_tap-variant-01.wav');
    // src/assets/navigation_selection-complete-celebration.wav
    constructor(private snackbar: MatSnackBar) {

    };

    public add(data: Product): void {
        this._products$.push(data);
    }

    public clear(): void {
        this._products$ = [];
        this.audio.play();
    }

    public get products(): Product[] {
        return this._products$;
    }

    public get total(): number {
        return this._products$.reduce(function (total, product) {
            total += product.price;
            return total;
        }, 0);
    }





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