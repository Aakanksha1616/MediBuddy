
import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { UtilityService } from 'src/app/core/utility.service';


@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.scss']
})
export class MedicineHomeComponent  {
 
  pincode:string="22222";
  city:string="Pune";
 
  

  searchText:string="";
  medicines:any=[];
  searchSubject = new Subject<string>();

  

  constructor(private api:ApiService, private utility:UtilityService) {}
  ngOnInit(){

      this.searchSubject.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((_query:string)=> this.api.getDataFromServer("top-deals?description_like="+this.searchText))
      ).subscribe({
        next:(resp:any)=>{
           console.log("response",resp);
           //mock the response
           if(resp && resp.length > 0){
            this.medicines =  resp;
           }else{
            this.medicines = [];
           }
        },
        error:()=>{

        }
      })

      
  }

  ngAfterViewInit(){
    // var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    // myModal.show();
    const myModal = new (window as any).bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
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

  searchProducts(){
      if(this.searchText.trim() == ''){
         this.medicines = [];
      }else{
          this.searchSubject.next(this.searchText)
          // this.api.getDataFromServer("top-deals?name="+this.searchText).subscribe({
          //   next:(resp:any)=>{
          //         console.log("resp",resp);
          //         //mock the response
          //         // this.medicines =
          //   }
          // })
      }
  }


}


