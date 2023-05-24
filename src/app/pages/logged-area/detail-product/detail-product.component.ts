import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCart } from 'src/app/interfaces/productCart';
import { CartService } from 'src/app/services/cart.service';
import { Product, ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  public quantity: number = 1;

  public productId?: string | null;
  public product?: Product = {
    discountPercentage: 1,
    price: 1,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.productId = routeParams.get('productId');
    if (this.productId) {
      this.getProduct();
    }
  }

  handleAddToCart() {
    const priceDiscounted =
      (this.product!.discountPercentage * this.product!.price) / 100;

    let newproduct: ProductCart = {
      discountedPrice: priceDiscounted,
      discountPercentage: this.product?.discountPercentage || 0,
      id: this.product?.id || 0,
      price: this.product?.price || 0,
      quantity: this.quantity,
      title: this.product?.title || '',
    };

    this.cartService.addProduct(newproduct);
    alert('Produto adicionado ao carrinho');
  }

  getProduct() {
    if (this.productId) {
      this.productService
        .getById(this.productId)
        .subscribe((result) => (this.product = result));
    } else {
      alert('Produto não fornecido');
    }
  }

  addQuantity() {
    if (this.quantity < (this.product?.stock || 3)) this.quantity++;
  }
  removeQuantity() {
    if (this.quantity > 1) this.quantity--;
  }
}
