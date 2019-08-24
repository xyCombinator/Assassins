import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KillButtonComponent } from './kill-button.component';

describe('KillButtonComponent', () => {
  let component: KillButtonComponent;
  let fixture: ComponentFixture<KillButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KillButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KillButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
