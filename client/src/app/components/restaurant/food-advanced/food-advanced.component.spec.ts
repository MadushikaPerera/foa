import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAdvancedComponent } from './food-advanced.component';

describe('FoodAdvancedComponent', () => {
  let component: FoodAdvancedComponent;
  let fixture: ComponentFixture<FoodAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
