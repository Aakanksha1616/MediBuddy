
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { UtilityService } from 'src/app/core/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
products: any = null;
pincode:string="";
city:string="";
pinCodeDetails:any;





constructor(private activateroute:ActivatedRoute, private utility:UtilityService, private api:ApiService, private http:HttpClient,private cdr: ChangeDetectorRef){

}

ngOnInit(){
     
 this.pinCodeDetails = this.utility.getPinCodeDetails();

//   let drugCode = this.activateroute.snapshot.paramMap.get('drugCode')
//   console.log(drugCode);
// const drugCode = Number(this.activateroute.snapshot.paramMap.get('drugCode'));
// this.productDetails.getProductDetails(drugCode).subscribe((data:any) => {
//   this.product = data;
// });
// const drugCode = String(this.activateroute.snapshot.paramMap.get('drugCode'));
// console.log('Drug Code:', drugCode);  // Check if this is being fetched correctly

// this.api.getProductDetails(drugCode).subscribe(
//   (data) => {
//     this.product = data;
//   },
//   (error) => {
//     console.error('Error fetching product details:', error);
//   }
// );
  
this.activateroute.params.subscribe((params) => {
  const drugCode = params['drugCode'];
  console.log('Drug Code:', drugCode);  // Log the drug code for debugging
  this.getProductDetails(drugCode);
});
}
 
getProductDetails(drugCode: string) {
  const endPoint = `top-deals?drugCode=${drugCode}`;
  console.log('API Endpoint:', endPoint);  // Log the API endpoint for debugging

  this.api.getDataFromServer(endPoint).subscribe({
    next: (data) => {
      console.log('Product data:', data);  // Log the API response data
      this.products = data;  // Assign the response data (or this.products if fetching an array)
      this.cdr.detectChanges();  // Manually trigger change detection
    },
    error: (error) => {
      console.error('Error fetching product details:', error);
    },
  });
}


  
  searchCityByPincode() {
    if (this.pincode.trim().length === 6) {
      const endPoint = "get-pincode-details?pincode=" + this.pincode;
      console.log(endPoint);

      this.api.getDataFromServer(endPoint).subscribe({
        next: (resp: any) => {
          console.log(resp);
          if(resp && resp.length > 0){
         this.city= resp[0].pincodeCity
         this.utility.setPinCodeDetails(resp[0]);
          }
        },
        error: () => {

        }
      })
    }
  }

  


}


