/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LinkCardComponent } from './link-card.component';

describe('LinkCardComponent', () => {
  let component: LinkCardComponent;
  let fixture: ComponentFixture<LinkCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
