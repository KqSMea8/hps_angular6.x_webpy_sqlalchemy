import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinLogListComponent } from './checkin-log-list.component';

describe('CheckinLogListComponent', () => {
  let component: CheckinLogListComponent;
  let fixture: ComponentFixture<CheckinLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
