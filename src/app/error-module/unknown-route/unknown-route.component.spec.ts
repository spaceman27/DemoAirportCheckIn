import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownRouteComponent } from './unknown-route.component';

describe('UnknownRouteComponent', () => {
  let component: UnknownRouteComponent;
  let fixture: ComponentFixture<UnknownRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
