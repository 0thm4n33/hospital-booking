import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from 'src/models/KeyValuePair';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private authService:AuthService,private router:Router){}


  show():Boolean{
    if(this.authService.isAuth() && !this.router.url.endsWith("signin")){
      return true;
    }
    return false;
  }
  title = 'reservation-front-web';
}
