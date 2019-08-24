import {Circle} from '../Model/circle';
import {Injectable} from '@angular/core';
import {of} from "rxjs/index";
import {Round} from '../Model/round';
import {Player} from '../Model/player';

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  private circles: Circle[]
  private klaus = new Player('Klaus');
  private ulla = new Player('Ulla');
  private martin = new Player('Martin');
  private edu = new Player('Edu');

  constructor() {
    const circles = [new Circle('cool guys'), new Circle('not so cool guys')];
    circles[0].addPlayer('Klaus');

    const round1 = new Round(1);
    round1.addDeadPlayer(this.klaus)
    round1.addLivingPlayer(this.ulla)
    round1.addLivingPlayer(this.martin)
    circles[0].addRound(round1)
    circles[0].addRound(new Round(2))

    circles[1].addPlayer('Jim');
    circles[1].addRound(new Round(3));
    this.circles = circles;
  }

  getCircles() {
    return of(this.circles);
  }

  getCircleByName(name: string) {
    const circle = this.circles.find((circ) => circ.getName() === name);
    return of(circle);
  }

  killVictimInCircle(circleToKill: Circle) {
    //Victim is Martin for now
    for (const circle of this.circles) {
      if (!(circle.getName() === circleToKill.getName())) {
        continue;
      }
      const roundsWithLiving = circle.getRounds().filter(round => round.livingPlayers.length > 0);
      if (roundsWithLiving.length !== 1) {
        return;
      }
      const martins = roundsWithLiving[0].livingPlayers.filter(player => player.userName === this.martin.userName);
      if (martins.length !== 1) {
        return;
      }
      const martin = martins[0];
      roundsWithLiving[0].livingPlayers = roundsWithLiving[0].livingPlayers.filter(player => player.userName !== martin.userName);
      roundsWithLiving[0].addDeadPlayer(martin);
      console.log('kill successfull');
    }
  }
}
