import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-round",
  templateUrl: "./round.component.html",
  styleUrls: ["./round.component.css"]
})
export class RoundComponent implements OnInit {
  @Input() round: IRound;
  constructor() {}

  ngOnInit() {}
}
