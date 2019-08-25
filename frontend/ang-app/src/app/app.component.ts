import {Component, OnInit, ViewChild, Directive} from '@angular/core';
import { UserService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'ang-app'
  currentCircle: ICircle;
  displayLoginScreen = false
  displayContentScreen = false
  @ViewChild('sidenavContainer') sidenavContainer

  constructor(private userService: UserService){
  }
  
  ngOnInit(){
   this.userService.loginFromStored().then((success) => {
      this.displayContentScreen = true
   }).catch((error) =>{
      this.displayLoginScreen = true;
   })
  }

  onLogIn(){
    this.displayLoginScreen = false
    this.displayContentScreen=true;

  }

  showLoginPage(){
    this.displayContentScreen=false;
    this.displayLoginScreen=true;
  }

}
