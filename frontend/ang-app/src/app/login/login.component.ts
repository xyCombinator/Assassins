import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { UserService } from "../services/user-service.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { CustomValidators } from "../validators/customValidators";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<boolean>();
  showLogin = true;

  registerForm: FormGroup;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: new FormControl(""),
      password: new FormControl(""),
      repeatPassword: new FormControl("")
    });
    this.setValidators();
  }

  private setValidators() {
    const formValidators = {
      username: Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]),
      password: Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]),

      repeatPassword: Validators.compose([
        Validators.required,
        CustomValidators.repeatedPasswordEqual(
          this.registerForm.get("password")
        )
      ])
    };
    this.registerForm.get("password").setValidators(formValidators["password"]);
    this.registerForm
      .get("repeatPassword")
      .setValidators(formValidators["repeatPassword"]);
    this.registerForm.get("username").setValidators(formValidators["username"]);
  }

  register() {
    const registrationResult = this.userService.register(
      this.registerForm.controls["username"].value,
      this.registerForm.controls["password"].value
    );
    registrationResult.then(() => {
      this.loggedIn.emit();
    });
    console.log("register");
  }

  login() {
    const registrationResult = this.userService.login(
      this.loginForm.controls["username"].value,
      this.loginForm.controls["password"].value
    );
    registrationResult.then(() => {
      this.loggedIn.emit();
    });
    console.log("register");
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    console.log("toggle");
  }
}
