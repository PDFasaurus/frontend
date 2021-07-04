import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'codemirror/mode/handlebars/handlebars';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { CookieService } from '../../cookie.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS, API_CALL_INCREMENT, DOLLAR_FOSSIL_VALUE, PRODUCT_ID, VENDOR_ID } from '../../constants';
import * as moment from 'moment';
import { API_PATH } from '../../constants';

const { Paddle } = window;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [AdminService, CookieService],
})
export class PlanComponent implements OnInit {
  error: string;
  notification: string;
  nextBillingDate: string;
  nextBillDate: string;
  plan: number;
  dollarFossilValue: number = DOLLAR_FOSSIL_VALUE;
  requests: number;
  balance: number;
  cancelUrl: string;
  updateUrl: string;
  email: string;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cookieService: CookieService,
    private routerService: ActivatedRoute,
    private router: Router,
  ) { }

  startPlan() {
    if (Paddle) {
      Paddle.Checkout.open({
        email: this.email,
        product: PRODUCT_ID,
      });
    }
  }

  changePlan() {
    if (confirm('Are you sure you want to do this?')) {
      const token: string = this.cookieService.getCookie(AUTH_COOKIE);
      const userId: number = this.adminService.parseJwt(token).sub
      const { plan } = this;

      this.adminService
        .updateSubscription(userId, plan, token)
        .subscribe((res: any) => {
          this.plan = plan;
          this.requests = plan * API_CALL_INCREMENT;
          this.error = null;
          this.notification = 'Successfully completed';
      }, (err) => {
        this.error = ERRORS.GENERIC;
        this.notification = null;
      });
    }
  }

  deletePlan() {
    if (confirm('Are you sure you want to do this?')) {
      const token: string = this.cookieService.getCookie(AUTH_COOKIE);
      const userId: number = this.adminService.parseJwt(token).sub

      this.adminService
        .cancelSubscription(userId, token)
        .subscribe((res: any) => {
          this.plan = 0;
          this.requests = 0;
          this.error = null;
          this.notification = 'Successfully completed';
      }, (err) => {
        this.error = ERRORS.GENERIC;
        this.notification = null;
      });
    }
  }

  ngOnInit(): void {
    if (Paddle) {
      Paddle.Setup({
        vendor: VENDOR_ID,
        eventCallback: (data) => {
          console.log(data.event);
          console.log(data.eventData);

          switch (data.event) {
            case "Checkout.PaymentComplete":
              this.fetchSubscription();
            case "Checkout.Close":
              this.fetchSubscription();
              break;
            case "Checkout.Complete":
              this.fetchSubscription();
              break;
          }
        }
      });
    }

    this.fetchSubscription();
  }

  increase() {
    this.plan = this.plan + 1;
    this.requests = this.plan * API_CALL_INCREMENT;
  }

  decrease() {
    if (this.plan == 1) return
    this.plan = this.plan - 1;
    this.requests = this.plan * API_CALL_INCREMENT;
  }

  fetchSubscription() {
    const token: string = this.cookieService.getCookie(AUTH_COOKIE);
    const userId: number = this.adminService.parseJwt(token).sub

    this.adminService
      .getSubscription(userId, token)
      .subscribe((res: any) => {
        const { lastPaymentDate, nextBillDate, plan, email, balance, cancelUrl, updateUrl } = res;

        // This is the old custom method
        this.nextBillingDate = lastPaymentDate ? moment(lastPaymentDate).add(1, 'month').format("DD MMM YYYY") : 'unavailable';

        // This is using Paddle (better)
        this.nextBillDate = moment(nextBillDate).format("DD MMM YYYY");
        this.plan = plan;
        this.email = email;
        this.cancelUrl = cancelUrl;
        this.updateUrl = updateUrl;
        this.requests = plan * API_CALL_INCREMENT;
        this.balance = balance;
    }, (err) => {
      this.error = ERRORS.GENERIC;
    });
  }

}
