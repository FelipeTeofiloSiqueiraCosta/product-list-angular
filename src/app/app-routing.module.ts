import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/logged-area/home/home.component';
import { DetailProductComponent } from './pages/logged-area/detail-product/detail-product.component';
import { CartComponent } from './pages/logged-area/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'detail/:productId',
    component: DetailProductComponent,
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
