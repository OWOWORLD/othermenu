import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSmellPage } from './order-smell.page';

describe('OrderSmellPage', () => {
  let component: OrderSmellPage;
  let fixture: ComponentFixture<OrderSmellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSmellPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSmellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
