import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/cart/cart.service';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.scss']
})
export class TopDealsComponent {
 topDeals:any= [];

  constructor(private api:ApiService, private cart:CartService, private router: Router){

  }
  // onProductClick(drugCode: number) {
  //   this.router.navigate(['/product-details', drugCode]);
  // }

  ngOnInit(){
    this.getTopDeals();
  }

  getTopDeals(){
    this.api.getDataFromServer("top-deals").subscribe({
       next:(resp:any)=>{
         if(resp && resp.length > 0){
                this.topDeals = resp;
         }
      },
      error:(error:any)=>{

      }
    })

  }

  // addToCart(productObj:any){
  //   if(productObj){
  //     // check if data is available on local storage.
  //     //if available then add data to existing cart.
  //     this.cartItems = this.cart.getCartDataFromServer()
  //     this.cartItems.push(productObj);
  //     let cartItemsStr = JSON.stringify(this.cartItems)
  //     localStorage.setItem("cart",cartItemsStr);
  //     this.cart.sendCartCount(this.cartItems.length);
  //   }
  // }

  addProductToCart(productObj:any){
    this.cart.addToCart(productObj);
  }

  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
