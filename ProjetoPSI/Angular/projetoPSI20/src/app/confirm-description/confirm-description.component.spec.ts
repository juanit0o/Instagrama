import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDescriptionComponent } from './confirm-description.component';

describe('ConfirmDescriptionComponent', () => {
  let component: ConfirmDescriptionComponent;
  let fixture: ComponentFixture<ConfirmDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
