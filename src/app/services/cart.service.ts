import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';

import { HttpClient } from '@angular/common/http';
import { ProductCart } from '../interfaces/productCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private currentCart: Cart;
  constructor(private httpClient: HttpClient) {
    const cart = localStorage.getItem('@first-app:cart');

    if (cart) {
      this.currentCart = JSON.parse(cart);
    } else {
      this.currentCart = {
        discountedTotal: 0,
        products: [],
        total: 0,
        totalQuantity: 0,
      };
    }
  }

  public addProduct(product: ProductCart) {
    let indexFinded = this.currentCart.products.findIndex(
      (item) => item.id === product.id
    );

    if (indexFinded != -1) {
      this.currentCart.products[indexFinded].quantity += product.quantity;
    } else {
      this.currentCart.products.push(product);
    }

    const total = product.price * product.quantity;

    this.currentCart.total += total;
    this.currentCart.totalQuantity += product.quantity;
    this.currentCart.discountedTotal +=
      product.discountedPrice * product.quantity;

    localStorage.setItem('@first-app:cart', JSON.stringify(this.currentCart));
  }

  get getCurrentCart(): Cart {
    return this.currentCart;
  }

  set setCurrentCart(cart: Cart) {
    this.currentCart = cart;
  }

  get getQuantityItems() {
    return this.currentCart.products.length;
  }
}
