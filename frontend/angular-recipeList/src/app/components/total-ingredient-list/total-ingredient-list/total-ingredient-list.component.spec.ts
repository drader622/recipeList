import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIngredientListComponent } from './total-ingredient-list.component';

describe('TotalIngredientListComponent', () => {
  let component: TotalIngredientListComponent;
  let fixture: ComponentFixture<TotalIngredientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalIngredientListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalIngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
