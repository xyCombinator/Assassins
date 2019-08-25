import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CircleService} from '../services/CircleService';

@Component({
  selector: 'current-round',
  templateUrl: './current-round.component.html',
  styleUrls: ['./current-round.component.css']
})
export class CurrentRoundComponent {

  nextVictim: IPlayer
  _round: IRound
  constructor(private service: CircleService){
  }

  @Input() 
  set round(round: IRound){
    this._round = round
    if(!round){
      return 
    }
    this.setNextVictim()
  }

  get round(){
    return this._round
  }

  @Output() victimKilledEvent: EventEmitter<any> = new EventEmitter();

  private setNextVictim(){
    this.nextVictim = this.round.nextVictim
  }

  killVictim(){
    this.service.killVictimInRound(this.round)
  }

}
