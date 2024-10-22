import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private selectedPincodeObj: any
  private drugCode: string = ""
  constructor() { }

  setPinCodeDetails(obj: any) {
    this.selectedPincodeObj = obj;
  }

  getPinCodeDetails() {
    return this.selectedPincodeObj;
  }

  getAuthToken() {
    let token = localStorage.getItem("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }

  }

  getUserDetails(){
    let userDetls = null;
    let data = localStorage.getItem("userDetails");
    if(data != null){
       userDetls = JSON.parse(data);
    }
    return userDetls;
  }
}
