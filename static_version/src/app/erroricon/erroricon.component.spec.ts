import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroriconComponent } from './erroricon.component';

describe('ErroriconComponent', () => {
  let component: ErroriconComponent;
  let fixture: ComponentFixture<ErroriconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroriconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroriconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
