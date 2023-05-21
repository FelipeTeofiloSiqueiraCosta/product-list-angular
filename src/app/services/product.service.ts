import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Product {
  id?: number;
  title?: string;
  description?: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
}
export interface HTTPResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(limit = 10, skip = 0): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
  }
  getById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  getByCategory(category: string): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(
      `https://dummyjson.com/products/search?q=${category}`
    );
  }
}
