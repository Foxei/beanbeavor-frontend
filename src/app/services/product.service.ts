import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FileUploadService } from './file-upload.service';

export interface Category {
    id: string;
    name: string;
    description: string;
}

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

    constructor(private firestore: AngularFirestore, private snackbar: MatSnackBar, private fileUploadService: FileUploadService) {
        this.products$.subscribe((products) => {
            this._productStatistic.numberOfProducts = products.length;
        });
    };

    firestoreProductsCollection = this.firestore.collection('products', ref => ref.orderBy('name', 'asc'));

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

    firestoreCategoriesCollection = this.firestore.collection('categories', ref => ref.orderBy('name', 'asc'));
    categories$ = this.firestoreCategoriesCollection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(p => {
                const category = p.payload.doc;
                const id = category.id;
                return { id, ...(category.data() as Record<string, unknown>) } as Category;
            });
        })
    );

    getProductsOfCategory(category: string): Observable<Product[]> {
        return this.firestore
            .collection('products', ref => ref.where('enabled', '==', true).where('category', '==', category).orderBy('name', 'asc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(p => {
                        const product = p.payload.doc;
                        const id = product.id;
                        return { id, ...(product.data() as Record<string, unknown>) } as Product;
                    });
                })
            );
    }


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
            this.snackbarSuccess("Price successfully changed to: " + price + "€.")
        } catch (err) {
            console.log(err);
        }
    }

    //CREATE
    async changeProductCategory(id: string, category: string): Promise<void> {
        try {
            await this.firestoreProductsCollection
                .doc(id)
                .set({
                    category: category,
                    lastEditTime: Date.now().valueOf()
                }, { merge: true });
            this.snackbarSuccess("Category successfully changed to: " + category + ".")
        } catch (err) {
            console.log(err);
        }
    }
    //CREATE
    async changeProdcutName(id: string, name: string): Promise<void> {
        try {
            await this.firestoreProductsCollection
                .doc(id)
                .set({
                    name: name,
                    lastEditTime: Date.now().valueOf()
                }, { merge: true });
            this.snackbarSuccess("Name successfully changed to: " + name + ".")
        } catch (err) {
            console.log(err);
        }
    }

    async changeProdcutDescription(id: string, description: string): Promise<void> {
        try {
            await this.firestoreProductsCollection
                .doc(id)
                .set({
                    description: description,
                    lastEditTime: Date.now().valueOf()
                }, { merge: true });
            this.snackbarSuccess("Description successfully changed to: " + description + ".")
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
            this.snackbarSuccess("Product successfully " + (enabled ? "enabled" : "disabled") + ".")
        } catch (err) {
            console.log(err);
        }
    }

    async changeProductImage(id: string, imageFile: any): Promise<void> {

        try {
            await this.fileUploadService.uploadFile(imageFile).then(() => {
                let image = { url: imageFile.url, name: imageFile.file!.name };
                this.firestoreProductsCollection
                    .doc(id)
                    .set({
                        image: image,
                        lastEditTime: Date.now().valueOf()
                    }, { merge: true });
                this.snackbarSuccess("Product image successfully updated.")
            });
        } catch (err) {
            console.log(err);
        }
    }


    //DELETE
    async deleteProduct(id: string): Promise<void> {
        try {
            await this.firestoreProductsCollection.doc(id).delete();
            this.snackbarSuccess("Product successfully deleted.")
        } catch (err) {
            console.log(err);
        }
    }

    public get numberOfProducts(): number {
        return this._productStatistic.numberOfProducts;
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