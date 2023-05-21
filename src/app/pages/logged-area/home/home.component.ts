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
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.fetchData(true);
  }

  fetchData(fetchData: boolean) {
    if (fetchData) {
      this.loading = true;

      this.subscription = this.productService
        .getProducts(this.limitProducts, this.skip * this.limitProducts)
        .subscribe((result) => {
          console.log(result.products);
          this.productList = this.productList.concat(result.products);

          this.skip += 1;
          this.loading = false;
        });
    }
  }

  unSubscribe() {
    this.subscription.unsubscribe();
  }

  handleSearchByproductName(event: Event, name: string) {
    event.preventDefault();
    console.log(name);
  }
}
