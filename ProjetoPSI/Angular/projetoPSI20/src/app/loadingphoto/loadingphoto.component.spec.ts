import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingphotoComponent } from './loadingphoto.component';

describe('LoadingphotoComponent', () => {
  let component: LoadingphotoComponent;
  let fixture: ComponentFixture<LoadingphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
