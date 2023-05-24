import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { ProductCart } from 'src/app/interfaces/productCart';
import { CartService } from 'src/app/services/cart.service';

interface ResumeProps {
  discountedTotal: number;
  total: number;
  totalQuantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cart!: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart;
  }

  get getProductCart(): ProductCart[] {
    return this.cart.products;
  }
}
