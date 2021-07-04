import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysComponent } from './keys.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbNavbar, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

describe('KeysComponent', () => {
  let component: KeysComponent;
  let fixture: ComponentFixture<KeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysComponent ],
      imports: [ RouterTestingModule, NgbNavModule ],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {}
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
