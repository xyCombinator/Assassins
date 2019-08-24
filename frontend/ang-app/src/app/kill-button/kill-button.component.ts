import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Circle} from '../Model/circle';
import {CircleService} from '../services/CircleService';

@Component({
  selector: 'app-kill-button',
  templateUrl: './kill-button.component.html',
  styleUrls: ['./kill-button.component.css']
})
export class KillButtonComponent {
  @Input() circleBlooo: Circle;

  constructor(private cs: CircleService) {
  }

  kill() {
    if (!this.circleBlooo) {
      return;
    }
    this.cs.killVictimInCircle(this.circleBlooo);
  }

}
