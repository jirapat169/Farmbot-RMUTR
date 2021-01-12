import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowVegetableComponent } from './grow-vegetable.component';

describe('GrowVegetableComponent', () => {
  let component: GrowVegetableComponent;
  let fixture: ComponentFixture<GrowVegetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowVegetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowVegetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
