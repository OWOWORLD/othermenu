import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkerSharePage } from './forker-share.page';

describe('ForkerSharePage', () => {
  let component: ForkerSharePage;
  let fixture: ComponentFixture<ForkerSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkerSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkerSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
