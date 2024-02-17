import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FileUploadService } from './file-upload.service';
import { User } from './authentication.service';
import { MessageService } from './message.service';

export interface Transaction {
    id: string;
    user: DocumentReference<User>;
    creationTime: number;
    product: TransactionItem;
}

export interface TransactionItem {
    name: string;
    price: number;
}

export class TransactionDatabaseStatistic {
    numberOfTransactions = 0;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    private _transactionStatistic: TransactionDatabaseStatistic = new TransactionDatabaseStatistic();
    private _firestoreTransactionCollection = this.firestore.collection('transactions', ref => ref.orderBy('creationTime', 'asc'));

    private _transactions$ = this._firestoreTransactionCollection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(p => {
                const transaction = p.payload.doc;
                const id = transaction.id;
                return { id, ...(transaction.data() as Record<string, unknown>) } as Transaction;
            });
        })
    );

    constructor(
        private firestore: AngularFirestore,
        private __messageService: MessageService) {
        this._transactions$.subscribe((transactions) => {
            this._transactionStatistic.numberOfTransactions = transactions.length;
        });
    };

    public get transactions(): Observable<Transaction[]> {
        return this._transactions$;
    }

    getTransactionOfUser(uid: string): Observable<Transaction[]> {
        return this.firestore
            .collection('transactions', ref => ref.where('uid', '==', uid).orderBy('creationTime', 'asc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(p => {
                        const transaction = p.payload.doc;
                        const id = transaction.id;
                        return { id, ...(transaction.data() as Record<string, unknown>) } as Transaction;
                    });
                })
            );
    }

    async addTransaction(data: Partial<Transaction>): Promise<void> {
        try {
            data.creationTime = Date.now().valueOf();
            await this._firestoreTransactionCollection.add(data);
            // this.snackbarSuccess("Price successfully checked out for " + data.product?.price + "€.");
        } catch (err) {
            this.__messageService.snackbarSuccess("Error occured: " + err);
        }
    }

    //DELETE
    async deleteTransaction(transaction: Transaction): Promise<void> {
        try {
            await this._firestoreTransactionCollection.doc(transaction.id).delete();
            this.__messageService.snackbarSuccess("Transaction successfully deleted.")
        } catch (err) {
            console.log(err);
            this.__messageService.snackbarError("Error while deleting transaction: " + err)
        }
    }

    public get numberOfTransactions(): number {
        return this._transactionStatistic.numberOfTransactions;
    }

}