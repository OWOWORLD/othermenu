import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorStartPage } from './curator-start.page';

describe('CuratorStartPage', () => {
  let component: CuratorStartPage;
  let fixture: ComponentFixture<CuratorStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuratorStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuratorStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
