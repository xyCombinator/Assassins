interface IRound {
  circleName: string;
  number: number;
  alivePlayers: IPlayer[];
  deadPlayers: IPlayer[];
  nextVictim: IPlayer;
  endTime: Date
}
