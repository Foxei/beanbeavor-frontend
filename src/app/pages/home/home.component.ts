import { Component } from '@angular/core';
import { ProductsService, Category, Product } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories: Category[] = [];
  
  _productsInCart: Product[] = [];
  _totalInCart: number = 0;

  _showCart: boolean = false;

  _checkingOut: boolean = false;

  constructor(private productService: ProductsService, public shoppingCartService: CartService) { }

  public scroll(id: string): void {
    const el = document.getElementById(id);
    el!.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  public ngAfterViewInit(): void {
    this.productService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  public get products(): Product[] {
    return this.shoppingCartService.products;
  }

  public get total(): number {
    return this.shoppingCartService.total;
  }

  public checkout(): void {
    this._checkingOut = true;
    this.shoppingCartService.checkout();
    this._checkingOut = false;
  }

  public clear(): void {
    this.shoppingCartService.clear();
  }

  public get showCart(): boolean{
    return this._showCart;
  }

  public get checkingOut(): boolean{
    return this._checkingOut;
  }

  public toogleCart(): void {
    this._showCart = !this._showCart;
  }

}

// Euglüh
// Almdudler
// Bier (0,33L auch alk.frei–außer Leffe/Erdinger)
// Bier (0,5 L) auch alk.frei  - kein Erdinger-
// Café au lait
// Cappuccino
// Club-Mate
// Coca Cola (hi-carb)
// Coke ZERO
// Coke Zero koffeinfrei
// Chouffe Bier
// Eifler Landbier
// Eis: Cuja Mara Split
// Eis: Magnum / NUII
// Engelbert Apfel
// Engelbert Naturell
// Engelbert/Rheinfels Sprudel
// Erdinger Alkoholfrei (0,5l) 
// Erdnüsse
// Fanta
// Fassbrause/Bionade
// Gerolsteiner
// Haribo-Beutel

// Kaffee klein
// Kaffee groß
// Latte Macchiato
// Moccachoc
// Espresso

// Erdinger Alkoholfrei (0.33l) 
// Knoppers Riegel
// Leffe
// Milka
// Pizza
// Rockstar/Monster (inkl. Pfand)
// Schoko-Creme (Kakao)

// Taschentücher
// Apfel
// Balisto
// Duplo
// Eis: Cornetto
// Eis: Nogger
// Oreo Kekse
// Trolli
// Twix 
// Yogurette
// Nuts Royal Nüsse
// Mandarine/Clementine
// MioMio Mate

// 3D-Druck pro gramm
// Simplex Farbe
// Simplex S/W
// Duplex S/W
// Duplex Farbe
