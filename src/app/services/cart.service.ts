import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';
import { Transaction, TransactionItem, TransactionsService } from './transactions.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    _products$: Product[] = [];
    firestoreCollection = this.firestore.collection('transactions', ref => ref.orderBy('creationTime', 'asc'));

    constructor(
        private firestore: AngularFirestore,
        private userService: AuthenticationService,
        private _transactionService: TransactionsService) { };

    public add(data: Product): void {
        this._products$.push(data);
    }

    public clear(): void {
        this._products$ = [];
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

    async checkout(): Promise<void> {
        let data: Partial<Transaction> = {};
        data.user = this.userService.userReference;
        for (let product of this.products) {
            let item: TransactionItem = { name: product.name, price: product.price };
            data.product = item;
            this._transactionService.addTransaction(data);
        }
        this.clear();
    }
}