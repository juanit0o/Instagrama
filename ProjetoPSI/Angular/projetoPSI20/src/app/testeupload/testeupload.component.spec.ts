import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteuploadComponent } from './testeupload.component';

describe('TesteuploadComponent', () => {
  let component: TesteuploadComponent;
  let fixture: ComponentFixture<TesteuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
