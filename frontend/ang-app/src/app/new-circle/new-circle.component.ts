import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CircleService} from '../services/CircleService';
import {CustomValidators} from '../validators/customValidators';

@Component({
  selector: 'app-new-circle',
  templateUrl: './new-circle.component.html',
  styleUrls: ['./new-circle.component.css']
})
export class NewCircleComponent implements OnInit {
  existingNames: string[] = [];

  newCircleFormGroup = this.fb.group({
    nameControl: ['', Validators.minLength(8), CustomValidators.doesNotContain(this.existingNames)],
    maxNumberOfPlayers: ['', [Validators.min(3), Validators.pattern('^[1-9][0-9]*$')]],
  });


  constructor(private fb: FormBuilder, private cs: CircleService) {
  }

  ngOnInit() {
    this.cs.getCircles().subscribe((circles) => {
      this.existingNames.splice(0, this.existingNames.length);
      circles.map((circle) => circle.getName()).forEach(name => this.existingNames.push(name));
      console.log(this.existingNames);

    });
  }

}
