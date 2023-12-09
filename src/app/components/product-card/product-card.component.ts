import { Component, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;


  @ViewChild('cardButton') _cardButton: MatButton
  _animating: boolean = false;

  constructor(private cartService: CartService) { }

  public onClick(product: Product, event: any) {
    this._animating = true;
    this._cardButton.disabled = true;

    setTimeout(() => {
      this._cardButton.disabled = true;
      this._animating = false;
    }, 1300);

    setTimeout(() => { this.cartService.add(product); }, 200);

  }

  public get animating(): boolean {
    return this._animating;
  }

}