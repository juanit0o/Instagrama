import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessiconComponent } from './successicon.component';

describe('SuccessiconComponent', () => {
  let component: SuccessiconComponent;
  let fixture: ComponentFixture<SuccessiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessiconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
