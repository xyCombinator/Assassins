import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CircleService } from "../services/circle-service.service";
import { CustomValidators } from "../validators/customValidators";

@Component({
  selector: "app-new-circle",
  templateUrl: "./new-circle.component.html",
  styleUrls: ["./new-circle.component.css"]
})
export class NewCircleComponent implements OnInit {
  existingNames: string[] = [];

  newCircleFormGroup = this.fb.group({
    nameControl: [
      "",
      [Validators.required, Validators.minLength(8)],
      CustomValidators.doesNotContain(this.existingNames)
    ]
  });

  constructor(private fb: FormBuilder, private circleService: CircleService) {}

  ngOnInit() {
    this.circleService.getCircles().subscribe((circles: ICircle[]) => {
      this.existingNames.splice(0, this.existingNames.length);
      circles
        .map<string>(circle => circle.name)
        .forEach(name => this.existingNames.push(name));
    });
  }

  onSubmit() {
    const circleName = this.newCircleFormGroup.controls["nameControl"].value;
    this.circleService.createNewCircle(circleName);
  }
}
