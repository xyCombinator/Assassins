import {Round} from './round';
import {Player} from './player';

export class Circle  implements ICircle{
  name : string= '';
  private _players: Player[] = []
  rounds: IRound[] = []

  constructor(name) {
    this.name = name;
  }

  addPlayer(player) {
    this._players.push(player);
  }

  addRound(round) {
    this.rounds.push(round);
  }

  getRounds() {
    return this.rounds;
  }


  get players(): Player[] {
    return this._players;
  }
}
