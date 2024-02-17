import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Observable, firstValueFrom, of, switchMap } from "rxjs";
import { first, map } from 'rxjs/operators';
import { User } from './authentication.service';
import { MessageService } from './message.service';

export interface KioskUser {
    id: string;
    user: DocumentReference<User>;
    pin: number;
    password: string;
}

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class KioskService {
    private kioskUser: KioskUser | undefined

    constructor(
        private firestore: AngularFirestore,   // Inject Firestore service
        private __messageService: MessageService) { }

    public get currentKioskUser() {
        return this.kioskUser;
    }

    public usersViaPin(pin: number) {
        let promise = new Promise<void>((resolve, reject) => {
            let query = this.firestore.collection('pins', ref => ref.where('pin', '==', pin).orderBy('pin', 'asc'))
            let response = query.snapshotChanges().pipe(map(actions => {
                return actions.map(p => {
                    const transaction = p.payload.doc;
                    const id = transaction.id;
                    return { id, ...(transaction.data() as Record<string, unknown>) } as KioskUser;
                });
            }));
            response.pipe(first()).subscribe(kioskUsers => {
                if (kioskUsers.length == 0) {
                    this.kioskUser = undefined;
                    this.__messageService.snackbarError("No user found with this pin.");
                    reject();
                } else {
                    this.kioskUser = kioskUsers.at(0);
                    // this.__messageService.snackbarSuccess("User found.");
                    resolve();
                }
            });

        });
        return promise;
    }

}