import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { ApiService } from 'src/app/core/api.service';
import { UtilityService } from 'src/app/core/utility.service';



@Component({
  selector: 'app-top-deals-product-by-categories',
  templateUrl: './top-deals-product-by-categories.component.html',
  styleUrls: ['./top-deals-product-by-categories.component.scss']
})
export class TopDealsProductByCategoriesComponent {
 
  medicineList:any;
  pinCodeDetails:any;

 constructor(private api:ApiService, private utility:UtilityService, private cart:CartService) {

 }

 ngOnInit(){
  this.pinCodeDetails = this.utility.getPinCodeDetails()
    this.getmedicineByCategory();

 }
  getmedicineByCategory() {
   this.api.getDataFromServer("top-deals-by-category").subscribe({
    next:(resp:any)=>{
         if(resp && resp.length > 0){
          this.medicineList = resp;
         }
    },

    error:(error:any)=>{
    console.log(error);

    }
   })
  }

  addProductToCart(productObj:any){
   this.cart.addToCart(productObj);
  }
}

