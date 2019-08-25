import {Component, Input, OnInit} from '@angular/core';
import {Circle} from '../Model/circle';
import {Round} from '../Model/round';

import {CircleService} from '../services/CircleService';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  circle: ICircle;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CircleService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => this.service.getCircleByName(params.get('name')))).subscribe((circ) => {
      this.circle = circ;
    });
  }

  getCurrentRound(): IRound{
    let roundsWithAlivePlayers = this.circle.rounds.filter((round) => round.alivePlayers.length !== 0)
    if(roundsWithAlivePlayers.length === 0){
      return null
    }
    return roundsWithAlivePlayers[0]
  }
}
