import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-component',
  templateUrl: './content-component.component.html',
  styleUrls: ['./content-component.component.css']
})
export class ContentComponentComponent implements OnInit {
  currentCircle: ICircle
  @ViewChild('sidenavContainer') sidenavContainer
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.sidenavContainer.autosize = true
  }
  setCurrentCircle(circle: ICircle) {
    this.currentCircle = circle;  
  }

}
