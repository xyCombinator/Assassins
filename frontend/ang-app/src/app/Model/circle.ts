import {Round} from './round';
import {Player} from './player';

export class Circle {
  private name = '';
  private _players: Player[] = []
  private rounds: Round[] = []

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
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
