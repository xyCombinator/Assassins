import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';

const HOST_ADDRESS = "/api"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInPlayer: IPlayer

  playerSubject: Subject<IPlayer> = new Subject<IPlayer>()

  constructor(private http: HttpClient) {
    setInterval(()=>{
      const res = this.loginFromStored()
      res.catch(()=>{
        console.log("this broke, so what")
      })
    }, 2500)
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
    let res: IPlayer = await this.http.post<IPlayer>(HOST_ADDRESS+"/register", userDTO, {headers}).toPromise()
    this.storeUserInfo(user, password)
    this.loggedInPlayer = res
    result = new Promise((resolve, reject) => resolve(true))
    } catch(error){
      result = new Promise((resolve, reject) => reject("Registration failed"))
    }
    return result
  }

  async login(user: string, password: string){
    let baseAuth = this.storeUserInfo(user, password)
    return this.loginFromStored()
  }

  async loginFromStored(){
    const userName = localStorage.getItem('username')
    if(!userName){
      return Promise.reject()
    }
    const base = localStorage.getItem('userInfo')
    let headers = new HttpHeaders();
    headers = headers.set("X-Requested-With", "XMLHttpRequest")
    headers= headers.set('Authorization', base);
    headers= headers.set('content-type', 'application/json');

    let success: Promise<Boolean>
    try{
      let res: IPlayer= await this.http.get<IPlayer>(HOST_ADDRESS+"/users/"+userName, {headers}).toPromise()
      this.loggedInPlayer = res
      this.updateLoggedInPlayer(res)
      success = new Promise((resolve, reject) => resolve(true))
    } catch(error){
      success = new Promise((resolve, reject) => reject("Login failed"))
    }
    return success
  }

  private storeUserInfo(username: string, password: string){
    const baseAuth = `Basic ${window.btoa(`${username}:${password}`)}`
    localStorage.setItem("userInfo", baseAuth)
    localStorage.setItem("username", username)
    return baseAuth
  }

  getUserInfo(){
    return localStorage.getItem('userInfo')
  }

  updateLoggedInPlayer(player: IPlayer){
    this.playerSubject.next(player)
    this.loggedInPlayer = player
  }
}
