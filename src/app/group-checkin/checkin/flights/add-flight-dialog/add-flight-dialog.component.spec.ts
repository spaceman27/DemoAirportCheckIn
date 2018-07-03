import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightDialogComponent } from './add-flight-dialog.component';

describe('AddFlightDialogComponent', () => {
  let component: AddFlightDialogComponent;
  let fixture: ComponentFixture<AddFlightDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlightDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
