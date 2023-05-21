import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  productId?: string | null;
  product?: Product = {
    discountPercentage: 1,
    price: 1,
  };
  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.productId = routeParams.get('productId');
    if (this.productId) {
      this.getProduct();
    }
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
}
