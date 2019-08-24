import {Component} from '@angular/core';
import {Circle} from './Model/circle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-app'
  currentCircle: Circle;

  setCurrentCircle(circle: Circle) {
    this.currentCircle = circle;
  }
}
