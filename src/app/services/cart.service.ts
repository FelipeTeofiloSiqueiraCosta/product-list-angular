import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private currentCartId: number = 0;
  private currentCart: Cart | null = null;
  constructor(private httpClient: HttpClient) {
    this.currentCartId = JSON.parse(
      localStorage.getItem('@first-app:cart') || ''
    );
    if (this.currentCartId != 0) {
      this.getCart(this.currentCartId).subscribe((response) => {
        this.currentCart = response;
      });
    }
  }

  get getCurrentCart(): Cart | null {
    return this.currentCart;
  }

  set setCurrentCart(cart: Cart) {
    this.currentCart = cart;
  }

  addCart() {
    console.log('adding cart---');
    this.httpClient
      .post('https://dummyjson.com/carts/add', {
        userId: 123,
        products:
          this.currentCart?.products.map((item) => {
            return {
              id: item.id,
              quantity: item.quantity,
            };
          }) || [],
      })
      .subscribe((response) => {
        console.log(response);
      })
      .unsubscribe();
  }

  getCart(cartId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(`https://dummyjson.com/carts/${cartId}`);
  }
}
