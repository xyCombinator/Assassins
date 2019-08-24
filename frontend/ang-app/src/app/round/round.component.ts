import {Component, Input, OnInit} from '@angular/core';
import {Round} from '../Model/round';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  @Input() round: Round
  constructor() { }

  ngOnInit() {
  }

}
