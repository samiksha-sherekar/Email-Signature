import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSignComponent } from './default-sign.component';

describe('DefaultSignComponent', () => {
  let component: DefaultSignComponent;
  let fixture: ComponentFixture<DefaultSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
