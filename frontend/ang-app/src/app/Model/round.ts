import {Player} from './player';

export class Round {
  number: number;
  livingPlayers: Player[] = []
  deadPlayers: Player[] = []
  nextVictim: Player

  constructor(roundNumber) {
    this.number = roundNumber;
  }

  addDeadPlayer(player: Player) {
    this.deadPlayers.push(player);
  }

  addLivingPlayer(player: Player) {
    this.livingPlayers.push(player);
  }
  removeLivingPlayer(player: Player) {
    this.livingPlayers = this.livingPlayers.filter(curPlayer => player !== curPlayer);
  }


  set victim(victim: Player){
    this.nextVictim = victim
  }
  get victim(){
    return this.nextVictim
  }
}
