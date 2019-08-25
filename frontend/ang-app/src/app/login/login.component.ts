import { Component, EventEmitter, Output} from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<boolean>()

  showLogin = true
  constructor(private userService: UserService) {
  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl()
  })


register(){
  const registrationResult = this.userService.register(this.registerForm.controls['username'].value, this.registerForm.controls['password'].value)
  registrationResult.then(()=>{
    this.loggedIn.emit()
  })
  console.log("register")
}

login(){
  const registrationResult = this.userService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
  registrationResult.then(()=>{
    this.loggedIn.emit()
  })
  console.log("register")
}



toggleLogin(){
  this.showLogin = !this.showLogin
  console.log("toggle")
}

}
