import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignGuestComponent } from './foreign-guest.component';

describe('ForeignGuestComponent', () => {
  let component: ForeignGuestComponent;
  let fixture: ComponentFixture<ForeignGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
