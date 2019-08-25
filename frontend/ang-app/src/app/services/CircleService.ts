import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {Subject} from 'rxjs';
import {Round} from '../Model/round';
import { UserService } from '../user-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CircleService {
  private circles: Subject<ICircle[]> = new Subject<ICircle[]>()

  constructor(private userService: UserService, private http: HttpClient) {
    this.getAllCircles()
    setInterval(() => this.getAllCircles(),3000)
  }

  getCircles(): Observable<ICircle[]> {
    return this.circles.asObservable();
  }

  async getCircleByName(name: string) {
    const circles: ICircle[] = await this.circles.toPromise()
    let found = circles.filter(circle => circle.name === name)
    if(found.length === 1){
      return found[0]
    }
    return null
  }

  async killVictimInRound(roundToKill: Round) {
    const user = this.userService.getLoggedInPlayer().name
    const userInfo = this.userService.getUserInfo()
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', userInfo);
    headers= headers.set('content-type', 'application/json');

    let result: Promise<Boolean>
    try{
    let res:IPlayer= await this.http.get<IPlayer>("/api/users/"+user, {headers}).toPromise()
    this.userService.updateLoggedInPlayer(res)

    result = new Promise((resolve, reject) => resolve(true))
    } catch(error){
      result = new Promise((resolve, reject) => reject("Login failed"))
    }
  }

  async getAllCircles(){
    const userInfo = this.userService.getUserInfo()
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', userInfo);
    headers= headers.set('content-type', 'application/json');

    let result: Promise<Boolean>
    let res:ICircle[]= await this.http.get<ICircle[]>("/api/circles", {headers}).toPromise()
    this.circles.next(res)
   }


}
