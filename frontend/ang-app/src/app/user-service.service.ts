import { Injectable } from '@angular/core';
import {Player} from './Model/player';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private klaus = new Player('Klaus')
  private ulla = new Player('Ulla')
  private martin = new Player('Martin')

  constructor() { }

  getAllPlayers(){
    return [this.klaus, this.ulla, this.martin]
  }
  getLoggedInPlayer(){
    return this.martin
  }
}
