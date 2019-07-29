import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkerOnboardPage } from './forker-onboard.page';

describe('ForkerOnboardPage', () => {
  let component: ForkerOnboardPage;
  let fixture: ComponentFixture<ForkerOnboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkerOnboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkerOnboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
