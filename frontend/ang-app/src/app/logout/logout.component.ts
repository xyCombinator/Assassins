import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent {
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  logout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    this.logoutEvent.emit();
    console.log("logout");
  }
}
