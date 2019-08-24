import {Player} from './player';

export class Round {
  number: number;
  livingPlayers: Player[] = []
  deadPlayers: Player[] = []

  constructor(roundNumber) {
    this.number = roundNumber;
  }

  addDeadPlayer(player: Player) {
    this.deadPlayers.push(player);
  }

  addLivingPlayer(player: Player) {
    this.livingPlayers.push(player);
  }
}
