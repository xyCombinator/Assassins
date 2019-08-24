import {Circle} from '../Model/circle';
import {Injectable} from '@angular/core';
import {of} from "rxjs/index";
import {Round} from '../Model/round';
import {Player} from '../Model/player';
import { UserService } from '../user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  private circles: Circle[]
  private klaus: Player
  private ulla: Player
  private martin: Player
  private nextVictims: Player[]

  private loggedInPlayer = this.martin

  constructor(private userService: UserService) {
    const circles = [new Circle('cool guys'), new Circle('not so cool guys')]
    const players = userService.getAllPlayers();
    this.klaus = players[0]
    this.ulla = players[1]
    this.martin = players[2]
    this.nextVictims = [this.ulla, this.klaus]
    this.loggedInPlayer = userService.getLoggedInPlayer()

    circles[0].addPlayer('Klaus');
    const round1 = new Round(1);
    round1.addLivingPlayer(this.klaus)
    round1.addLivingPlayer(this.ulla)
    round1.addLivingPlayer(this.martin)
    round1.victim = this.nextVictims.pop()
    circles[0].addRound(round1)

    circles[0].addRound(new Round(2))
    circles[1].addPlayer('Jim')
    circles[1].addRound(new Round(3))
    this.circles = circles
  }

  getCircles() {
    return of(this.circles);
  }

  getCircleByName(name: string) {
    const circle = this.circles.find((circ) => circ.getName() === name)
    return of(circle);
  }

  killVictimInRound(roundToKill: Round) {
    for (const circle of this.circles) {
      const foundRounds = circle.getRounds().filter((round) => round === roundToKill)
      if(foundRounds.length !== 1){
        continue
      }

      const currentRound = foundRounds[0]
      const foundMartin = currentRound.livingPlayers.filter(player => player.userName === this.martin.userName)
      if (!foundMartin) {
        return
      }
      const martin = foundMartin[0];
      console.log(martin)
      currentRound.addDeadPlayer(currentRound.victim)
      currentRound.removeLivingPlayer(currentRound.victim)

      currentRound.victim = this.nextVictims.pop()
      console.log('kill successfull')
    }
  }
}
