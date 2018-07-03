import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinPreviewComponent } from './checkin-preview.component';

describe('CheckinPreviewComponent', () => {
  let component: CheckinPreviewComponent;
  let fixture: ComponentFixture<CheckinPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
