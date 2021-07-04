import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanComponent ],
      imports: [ RouterTestingModule ],
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
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
