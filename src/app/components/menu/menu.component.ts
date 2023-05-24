import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public qteCartItems: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.qteCartItems = this.cartService.getQuantityItems;
  }
}
