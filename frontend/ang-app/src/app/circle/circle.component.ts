import { Component, OnInit } from "@angular/core";

import { CircleService } from "../services/circle-service.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user-service.service";

@Component({
  selector: "app-circle",

  templateUrl: "./circle.component.html",
  styleUrls: ["./circle.component.css"]
})
export class CircleComponent implements OnInit {
  circleName: string;
  circle: ICircle;
  currentRound: IRound;
  isActive: boolean = false;
  canBeActivated: boolean = false;
  playerWon: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: CircleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.circleName = map.get("name");
      this.userService.loginFromStored();
      this.userService.playerSubject.subscribe(player => {
        const circleInPlayer = this.findCircleInPlayer(this.circleName, player);
        if (!circleInPlayer) {
          return;
        }
        this.circle = circleInPlayer;
        this.setCurrentRound();
        this.updateActivationButton();
      });
    });
  }

  setCurrentRound() {
    let roundsWithAlivePlayers = this.circle.rounds.filter(
      round => round.alivePlayers.length !== 1
    );
    if (roundsWithAlivePlayers.length === 0) {
      this.currentRound = null;
      return;
    }
    this.currentRound = roundsWithAlivePlayers[0];
  }

  private findCircleInPlayer(circleName: string, player: IPlayer) {
    const foundCirc = player.circles.filter(c => c.name === circleName);
    if (foundCirc.length === 1) {
      return foundCirc[0];
    }
    return null;
  }

  private updateActivationButton() {
    this.canBeActivated =
      this.circle.players.length >= 3 &&
      this.circle.owner.name === this.userService.getLoggedInPlayer().name &&
      this.currentRound == null;
  }

  activateCircle() {
    this.service.activateCircle(this.circle.name);
  }
}
