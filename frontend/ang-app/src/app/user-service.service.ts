import { Injectable } from '@angular/core';
import {Player} from './Model/player';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';

const HOST_ADDRESS = "/api"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private klaus = new Player('Klaus')
  private martin = new Player('Martin')
  
  private ulla = new Player('Ulla')
  private loggedInPlayer: IPlayer
  private password: string

  execChange: Subject<IPlayer> = new Subject<IPlayer>()

  constructor(private http: HttpClient) { }

  getAllPlayers(){
    return [this.klaus, this.ulla, this.martin]
  }
  getLoggedInPlayer(){
    return this.loggedInPlayer
  }

  async register(user: string, password: string){
    const userDTO = JSON.stringify({user: user, password: password})
    let headers = new HttpHeaders();
    headers= headers.set('content-type', 'application/json');
    let result: Promise<Boolean>
    try{
    let res = await this.http.post(HOST_ADDRESS+"/register", userDTO, {headers}).toPromise()
    this.loggedInPlayer = new Player(user)
    this.password = password

    result = new Promise((resolve, reject) => resolve(true))
    } catch(error){
      result = new Promise((resolve, reject) => reject("Registration failed"))
    }
    return result
  }

  async login(user: string, password: string){
    let headers = new HttpHeaders();
    let baseAuth = this.storeUserInfo(user, password)
    console.log(baseAuth)
    headers= headers.set('Authorization', baseAuth);
    headers= headers.set('content-type', 'application/json');

    let success: Promise<Boolean>
    try{
      let res= await this.http.get(HOST_ADDRESS+"/users/"+user, {headers}).toPromise()
      this.loggedInPlayer = new Player(user)
      let player = res as IPlayer
      this.password = password
      success = new Promise((resolve, reject) => resolve(true))
    } catch(error){
      success = new Promise((resolve, reject) => reject("Login failed"))
    }
    return success
  }

  private storeUserInfo(username: string, password: string){
    const baseAuth = `Basic ${window.btoa(`${username}:${password}`)}`
    localStorage.setItem("userInfo", baseAuth)
    return baseAuth
  }

  getUserInfo(){
    return localStorage.getItem('userInfo')
  }

  updateLoggedInPlayer(player: IPlayer){
    this.execChange.next(player)
  }

}
