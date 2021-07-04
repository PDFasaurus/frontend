import { Component, OnInit } from '@angular/core';
import { API_CALL_INCREMENT, API_CALL_PRICING_INCREMENT } from '../constants';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  view: string = "home";
  amount: number = 0;
  cost: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.amount += API_CALL_INCREMENT;
    this.updateCost();
  }

  updateCost() {
    this.cost = this.amount * API_CALL_PRICING_INCREMENT;
  }

  increase() {
    this.amount += API_CALL_INCREMENT;
    this.updateCost();
  }

  decrease() {
    if (this.amount == 0) return
    this.amount -= API_CALL_INCREMENT;
    this.updateCost();
  }

  navigate(view: string) {
    this.view = view;
  }
}
