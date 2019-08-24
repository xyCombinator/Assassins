export class Player {
  private _userName: string;
  constructor(username: string) {
    this._userName = username;
  }

  get userName(): string {
    return this._userName
  }
}
