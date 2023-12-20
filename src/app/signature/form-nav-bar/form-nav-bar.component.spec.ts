import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNavBarComponent } from './form-nav-bar.component';

describe('FormNavBarComponent', () => {
  let component: FormNavBarComponent;
  let fixture: ComponentFixture<FormNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
