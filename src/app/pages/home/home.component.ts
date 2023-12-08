import { Component } from '@angular/core';
import { ProductsService, Category } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  categories: Category[] = [];

  constructor(private productService: ProductsService) { }

  public scroll(id: string): void {
    const el = document.getElementById(id);
    el!.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  public ngAfterViewInit(): void {
    this.productService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
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
