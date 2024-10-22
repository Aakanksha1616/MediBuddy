import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicineHomeComponent } from './components/medicine-home/medicine-home.component';
import { TopDealsProductByCategoriesComponent } from './components/top-deals-medicine-category/top-deals-product-by-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { BookingDetailsComponent } from './cart/booking-details/booking-details.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"medicine-home", component:MedicineHomeComponent},
  {path:"top-deals-productBy-categories", component:TopDealsProductByCategoriesComponent},
  {path:"product-details/:drugCode", component:ProductDetailsComponent},
  {path:"cart", component:CartComponent , canActivate:[authGuard]},
  { path:"booking-details",component:BookingDetailsComponent},
  {path:"", redirectTo:"/home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
