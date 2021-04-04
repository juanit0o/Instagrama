import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualphotoComponent } from './individualphoto.component';

describe('IndividualphotoComponent', () => {
  let component: IndividualphotoComponent;
  let fixture: ComponentFixture<IndividualphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
