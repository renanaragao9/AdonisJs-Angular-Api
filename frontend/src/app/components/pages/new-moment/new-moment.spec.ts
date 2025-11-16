import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoment } from './new-moment';

describe('NewMoment', () => {
  let component: NewMoment;
  let fixture: ComponentFixture<NewMoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMoment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
