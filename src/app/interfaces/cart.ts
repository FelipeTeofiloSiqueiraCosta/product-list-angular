import { ProductCart } from './productCart';

export interface Cart {
  products: ProductCart[];
  total: number;
  discountedTotal: number;
  totalQuantity: number;
}
