export class Player2 implements IPlayer {
  private _name: string;
  private _circles: ICircle[] = [];
  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get circles() {
    return this._circles;
  }

  set circles(circles: ICircle[]) {
    this.circles = circles;
  }
}
