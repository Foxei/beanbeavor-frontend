import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class ProductDatabaseStatistic {
    numberOfProducts = 0;
}

export interface Image {
    name: string;
    url: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    enabled: boolean;
    image: Image;
    creationTime: number;
    lastEditTime: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private _productStatistic: ProductDatabaseStatistic = new ProductDatabaseStatistic();

    constructor(private firestore: AngularFirestore) {
        this.products$.subscribe((products) => {
            this._productStatistic.numberOfProducts = products.length;
        });
    };

    firestoreProductsCollection = this.firestore.collection('products', ref => ref.orderBy('creationTime', 'asc'));

    //READ
    products$ = this.firestoreProductsCollection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(p => {
                const product = p.payload.doc;
                const id = product.id;
                return { id, ...(product.data() as Record<string, unknown>) } as Product;
            });
        })
    );


    //CREATE
    async addProduct(data: Partial<Product>): Promise<void> {
        try {
            data.enabled = false;
            data.creationTime = Date.now().valueOf();
            data.lastEditTime = Date.now().valueOf();
            await this.firestoreProductsCollection.add(data);
        } catch (err) {
            console.log(err);
        }
    }

    //CREATE
    async changeProductPrice(id: string, price: number): Promise<void> {
        try {
            await this.firestoreProductsCollection
                .doc(id)
                .set({
                    price: price,
                    lastEditTime: Date.now().valueOf()
                }, { merge: true });
        } catch (err) {
            console.log(err);
        }
    }



    //ENDABLE
    async enableProduct(id: string, enabled: boolean): Promise<void> {
        try {
            await this.firestoreProductsCollection
                .doc(id)
                .set({
                    enabled: enabled,
                    lastEditTime: Date.now().valueOf()
                }, { merge: true });
        } catch (err) {
            console.log(err);
        }
    }


    //DELETE
    async deleteProduct(id: string): Promise<void> {
        try {
            await this.firestoreProductsCollection.doc(id).delete();
        } catch (err) {
            console.log(err);
        }
    }

    public get numberOfProducts(): number {
        return this._productStatistic.numberOfProducts;
    }

}