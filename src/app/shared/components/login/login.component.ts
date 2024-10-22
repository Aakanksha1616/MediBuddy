import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  displayErrorMsg:boolean=false;
  loginForm!:FormGroup
  @Output()
  emitAction:EventEmitter<boolean> = new EventEmitter();
  constructor(private fb:FormBuilder, private api:ApiService){

  }
  ngOnInit(){
   this.initializeForm()
  }
  initializeForm() {
    this.loginForm = this.fb.group({
        email:['',[Validators.required]],
        password:['',[Validators.required]]
    })
  }

  login(){
    console.log(this.loginForm.value);
    let params = new HttpParams()
    .set("email", this.loginForm.get('email')?.value)
    .set("password", this.loginForm.get('password')?.value);
  

       this.api.getDataFromServer("users",params).subscribe({
        next:(resp:any)=>{
            console.log(resp);
            if(resp && resp.length > 0){
              this.displayErrorMsg= false;
              const token ="Hedsmakkkkke444fnkasc";
              localStorage.setItem("userDetails",JSON.stringify(resp[0]));
              localStorage.setItem("token", token);
              this.emitAction.emit(true);
            }else{
             this.displayErrorMsg = true;
             this.emitAction.emit(false);
            }
           
        },
        error:(error:any)=>{
         

        }
       })
  }
}


