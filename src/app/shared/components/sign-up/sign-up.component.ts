import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
 userObj:User = new User();

 displayOtpFiled:boolean=false;
 generateOtp!:number;
 sub!:Subscription;
 otpTimer!:number;
 disableGetOtpBtn:boolean = false;
 enteredOtp!:number;
 errorMessage:string="";
 successMessage:string="";

 constructor(private api:ApiService){}

 getOtp(){
  this.displayOtpFiled = true;
  this.disableGetOtpBtn = true;
  this.generateOtp = this.generateRandomNumber();
  console.log("otp", this.generateOtp);
      interval(1000).subscribe({
        next:(resp:any)=>{
          console.log(resp);
          this.otpTimer = 60 - resp;
          if(this.otpTimer == 0){
            this.disableGetOtpBtn = false;
             this.sub.unsubscribe();
          }
        }
      })
 }

 verifyOtp(){
  if(this.generateOtp == this.generateOtp){
    this.displayOtpFiled = false;
    this.userObj.isOtpVerified = true;
  }


 }

 generateRandomNumber(){
  var min = 100000;
  var max = 999999;
  let randomNo = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNo;
 }

 signUp(){
 if(this.userObj.isOtpVerified){
   this.api.postDataToServer("users",this.userObj).subscribe({
    next:(resp:any)=>{
      if(resp != null){
         this.successMessage = "Users Registered SuccessFully";
         this.errorMessage = "";
      }else{
       this.successMessage = "";
       this.errorMessage= "User not registered Plz retry again";
      }

    },
    error:(error)=>{

    }
   })
 }else{
  this.errorMessage = "Plz verify mobile No."
 }
 }
}

export class User{
  name!:string;
  email!:string;
  mobileNo!:string;
  isOtpVerified!:boolean;
  password!:string;

}
