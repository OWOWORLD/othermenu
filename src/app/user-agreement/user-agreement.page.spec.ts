import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgreementPage } from './user-agreement.page';

describe('UserAgreementPage', () => {
  let component: UserAgreementPage;
  let fixture: ComponentFixture<UserAgreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgreementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
