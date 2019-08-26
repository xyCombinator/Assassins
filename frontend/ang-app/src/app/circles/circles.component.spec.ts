import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CirclesComponent } from "./circles.component";
import { MatListModule, MatSidenavModule } from "@angular/material";
import { CircleComponent } from "../circle/circle.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { describe, expect } from "jasmine";

describe("CirclesComponent", () => {
  let component: CirclesComponent;
  let fixture: ComponentFixture<CirclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CirclesComponent, CircleComponent],
      imports: [BrowserAnimationsModule, MatListModule, MatSidenavModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
