import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CircleService} from '../services/CircleService';
import {Circle} from '../Model/circle';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css'],
})
export class CirclesComponent implements OnInit {
  currentCircle: ICircle
  loggedInPlayer: IPlayer
  @Output() circleSelected = new EventEmitter<ICircle>();

  private circles: ICircle[];

  constructor(private circleService: CircleService, private userService: UserService) {
  }

  ngOnInit() {
    this.circleService.getCircles().subscribe((circles) => {
      this.circles = circles;
      if (circles && !this.currentCircle) {
        this.currentCircle = circles[0];
      }
    });
    this.setPlayer()
  }

  setCurrentCircle(circle) {
    const circleFromPlayer = this.findCircleInPlayer(circle)
    this.currentCircle = circleFromPlayer
    this.circleSelected.emit(circleFromPlayer);
  }

  private findCircleInPlayer(circle: ICircle){
    const foundCirc = this.loggedInPlayer.circles.filter((c) => c.name === circle.name)
    if(foundCirc.length === 1){
      return foundCirc[0]
    }
    return null
  }

  private setPlayer(){
    this.userService.execChange.subscribe((player) => {
      this.loggedInPlayer = player
    })
  }
}
