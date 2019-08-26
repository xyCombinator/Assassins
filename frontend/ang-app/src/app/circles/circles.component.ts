import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CircleService } from "../services/circle-service.service";
import { UserService } from "../services/user-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-circles",
  templateUrl: "./circles.component.html",
  styleUrls: ["./circles.component.css"]
})
export class CirclesComponent implements OnInit {
  currentCircle: ICircle;
  loggedInPlayer: IPlayer;
  @Output() circleSelected = new EventEmitter<ICircle>();

  private circles: ICircle[] = [];
  private circleButtons: CircleButton[] = [];

  constructor(
    private circleService: CircleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setPlayer();
    this.setCircles();
  }

  private setPlayer() {
    this.loggedInPlayer = this.userService.getLoggedInPlayer();
    this.setButtons();
    this.userService.playerSubject.subscribe(player => {
      this.loggedInPlayer = player;
    });
  }
  private setCircles() {
    this.circleService.getCircles().subscribe(circles => {
      this.circles = circles;
      this.setButtons();
    });
  }

  private setButtons() {
    const buttons: CircleButton[] = [];

    for (let circle of this.circles) {
      const name = circle.name;
      let active = false;
      let joined = false;
      const circleOfPlayer = this.loggedInPlayer.circles.filter(
        circ => circ.name === circle.name
      );
      if (circleOfPlayer.length === 1) {
        active = this.isCircleActive(circleOfPlayer[0]);
        joined = this.isPlayerJoined(circleOfPlayer[0].name);
      }
      const button = new CircleButton(name, joined, active);
      buttons.push(button);
    }
    this.circleButtons = buttons;
  }

  setCurrentCircle(button: CircleButton) {
    const circle = this.loggedInPlayer.circles.filter(
      circle => circle.name === button.name
    );
    if (circle.length === 0) {
      this.circleService.joinCircle(button.name);
    }
    this.router.navigate([`/circle/${button.name}`]);
  }

  private isCircleActive(circle: ICircle) {
    return (
      circle.rounds.filter(round => round.alivePlayers.length > 1).length === 1
    );
  }

  private isPlayerJoined(circle: string) {
    return (
      this.loggedInPlayer.circles
        .map(circle => circle.name)
        .filter(name => name === circle).length > 0
    );
  }
}

class CircleButton {
  name: string;
  joined: boolean;
  active: boolean;

  constructor(name: string, joined: boolean, active: boolean) {
    (this.name = name), (this.joined = joined), (this.active = active);
  }
}
