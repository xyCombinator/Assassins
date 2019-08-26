import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
@Component({
  selector: "app-previous-rounds",
  templateUrl: "./previous-rounds.component.html",
  styleUrls: ["./previous-rounds.component.css"]
})
export class PreviousRoundsComponent {
  _rounds: FinishedRound[] = [];

  @Input()
  set circle(circle: ICircle) {
    if (!circle) {
      return;
    }
    const newRounds: FinishedRound[] = [];
    for (let round of circle.rounds) {
      if (!this.isRoundFinished(round)) {
        continue;
      }
      const winner = this.getWinnerOfRound(round);
      newRounds.push(
        new FinishedRound(winner.name, round.number, round.endTime)
      );
    }
    this._rounds = newRounds;
  }

  get finishedRounds() {
    return this._rounds;
  }
  private isRoundFinished(round: IRound) {
    return round.alivePlayers.length === 1;
  }

  private getWinnerOfRound(round: IRound) {
    return round.alivePlayers[0];
  }
}

class FinishedRound {
  winner: string;
  number: number;
  endTime: string;

  constructor(winner: string, number: number, endTime: Date) {
    this.winner = winner;
    this.number = number;
    this.endTime = moment(endTime).format("DD/MM HH:mm");
  }
}
