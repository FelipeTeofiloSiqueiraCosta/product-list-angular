import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  subscription: Subscription = new Subscription();
  limitProducts = 10;
  skip = 0;
  loading = false;
  fetchVerify = true;
  categorySearched: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.fetchData(true);
  }

  fetchData(fetchData: boolean) {
    if (fetchData && this.fetchVerify) {
      this.loading = true;
      if (this.categorySearched != '') {
        this.getByCategory();
      } else {
        this.getAllProducts();
      }
    }
  }

  getByCategory() {
    this.subscription = this.productService
      .getByCategory(this.categorySearched)
      .subscribe((result) => {
        if (
          this.productList.length > 0 &&
          result.products[0].id == this.productList[0].id
        ) {
          this.fetchVerify = false;
        } else {
          this.productList = result.products;
          this.fetchVerify = true;
        }

        this.loading = false;

        this.unSubscribe();
      });
  }

  getAllProducts() {
    this.subscription = this.productService
      .getProducts(this.limitProducts, this.skip * this.limitProducts)
      .subscribe((result) => {
        this.productList = this.productList.concat(result.products);

        this.skip += 1;
        this.loading = false;

        this.unSubscribe();
      });
  }

  unSubscribe() {
    this.subscription.unsubscribe();
  }

  handleSearchByproductName(event: Event, name: string) {
    event.preventDefault();
    if (this.categorySearched == name) {
      this.fetchVerify = false;
    } else {
      this.skip = 0;

      this.productList = [];
      this.categorySearched = name;
      this.fetchVerify = true;
      this.fetchData(true);
    }
  }
}
