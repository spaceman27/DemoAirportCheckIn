import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCheckinComponent } from './group-checkin.component';

describe('GroupCheckinComponent', () => {
  let component: GroupCheckinComponent;
  let fixture: ComponentFixture<GroupCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
