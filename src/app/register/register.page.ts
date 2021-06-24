import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
  }
  async onRegister(email, password){
    try {
     const user= await this.authSvc.register(email.value, password.value);
      if(user){
         //ver si está verficado el email
        console.log('User->',user); 
      }
    } catch (error) {
      console.log('Error',error)
    }
  }
}
