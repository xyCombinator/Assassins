import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PreviousRoundsComponent } from "./previous-rounds.component";

describe("PreviousRoundsComponent", () => {
  let component: PreviousRoundsComponent;
  let fixture: ComponentFixture<PreviousRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousRoundsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
