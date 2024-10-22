import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDealsProductByCategoriesComponent } from './top-deals-product-by-categories.component';

describe('TopDealsProductByCategoriesComponent', () => {
  let component: TopDealsProductByCategoriesComponent;
  let fixture: ComponentFixture<TopDealsProductByCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopDealsProductByCategoriesComponent]
    });
    fixture = TestBed.createComponent(TopDealsProductByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
