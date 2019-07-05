import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkSharePage } from './fork-share.page';

describe('ForkSharePage', () => {
  let component: ForkSharePage;
  let fixture: ComponentFixture<ForkSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
