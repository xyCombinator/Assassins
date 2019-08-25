export class Circle2  {
  name : string= '';
  private _players: IPlayer[] = []
  rounds: IRound[] = []
  owner: IPlayer

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


  get players(): IPlayer[] {
    return this._players;
  }
}
