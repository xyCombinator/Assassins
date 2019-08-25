import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Round} from '../Model/round';
import {Player} from '../Model/player';
import {CircleService} from '../services/CircleService';
import { UserService } from '../user-service.service';

@Component({
  selector: 'current-round',
  templateUrl: './current-round.component.html',
  styleUrls: ['./current-round.component.css']
})
export class CurrentRoundComponent {
  constructor(private service: CircleService){
  }

  @Input() round: Round
  @Output() victimKilledEvent: EventEmitter<any> = new EventEmitter();

  getNextVictim(): Player{
    let foundVictims = this.round.livingPlayers.filter((player) => player.name === this.round.victim.name)

    if(foundVictims.length !== 1){
      return null
    }
    return foundVictims[0]
  }

  killVictim(){
    this.service.killVictimInRound(this.round)
  }

}
