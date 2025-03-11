import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryMenuComponent } from './recipe-category-menu.component';

describe('RecipeCategoryMenuComponent', () => {
  let component: RecipeCategoryMenuComponent;
  let fixture: ComponentFixture<RecipeCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCategoryMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
