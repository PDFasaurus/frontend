import { Component, OnInit } from '@angular/core';
import { CookieService } from '../cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS } from '../constants';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService, CookieService],
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  logout() {
    this.cookieService.deleteCookie(AUTH_COOKIE);
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    if (this.cookieService.getCookie(AUTH_COOKIE)) {
      const token: string = this.cookieService.getCookie(AUTH_COOKIE);
      const expiry: any = this.authService.parseJwt(token).exp
      const expiryDate: any = moment(new Date(expiry * 1000))
      const hasExpired: boolean = moment(new Date()).isAfter(expiryDate)

      if (hasExpired) {
        this.cookieService.deleteCookie(AUTH_COOKIE);
        this.router.navigate(['/auth']);
      }
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
