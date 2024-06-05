import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListStatusComponent } from './grocery-list-status.component';

describe('GroceryListStatusComponent', () => {
  let component: GroceryListStatusComponent;
  let fixture: ComponentFixture<GroceryListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroceryListStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroceryListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
