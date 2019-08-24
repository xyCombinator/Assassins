import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CircleService} from '../services/CircleService';
import {Circle} from '../Model/circle';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css'],
})
export class CirclesComponent implements OnInit {
  currentCircle: Circle = new Circle('a');
  @Output() circleSelected = new EventEmitter<Circle>();

  private circles: Circle[];

  constructor(private circleService: CircleService) {
  }

  ngOnInit() {
    this.circleService.getCircles().subscribe((circles) => {
      this.circles = circles;
      if (circles) {
        this.currentCircle = circles[0];
      }
    });
  }

  setCurrentCircle(circle) {
    this.currentCircle = circle;
    this.circleSelected.emit(circle);
  }
}
