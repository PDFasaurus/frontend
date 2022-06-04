import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../cookie.service';
import { API_PATH } from '../constants';

// Default & authless
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  parseJwt(token: string): any {
    if (!token) return {}

    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  getRequests(
    token: string,
    page: number,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/requests?page=' + page, httpOptionsWithToken);
  }

  getSubscription(
    userId: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/users/' + userId + '', httpOptionsWithToken);
  }

  cancelSubscription(
    userId: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.put(API_PATH + '/users/' + userId + '/cancel_subscription', {}, httpOptionsWithToken);
  }

  updateSubscription(
    userId: string,
    plan: number,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.put(API_PATH + '/users/' + userId + '/update_subscription', { plan }, httpOptionsWithToken);
  }

  getApiKey(
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/key', httpOptionsWithToken);
  }

  getNewApiKey(
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/key/new', httpOptionsWithToken);
  }

  updateTemplate(
    templateId: string,
    content: string,
    name: string,
    width: number,
    height: number,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.put(API_PATH + '/templates/' + templateId, {
      content,
      name,
      deleted: false,
      width,
      height,
    }, httpOptionsWithToken);
  }

  deleteTemplate(
    templateId: string,
    content: string,
    name: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.put(API_PATH + '/templates/' + templateId, {
      content,
      name,
      deleted: true,
    }, httpOptionsWithToken);
  }

  getTemplate(
    templateId: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/templates/' + templateId, httpOptionsWithToken);
  }

  getTemplates(
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.get(API_PATH + '/templates', httpOptionsWithToken);
  }

  createTemplate(
    name: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.post(API_PATH + '/templates', {
      name
    }, httpOptionsWithToken);
  }

  preview(
    templateId: string,
    templateValues: string,
    token: string,
  ): any {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
    };

    // ID or SLUG can be null here
    return this.http.post(API_PATH + '/templates/preview', {
      templateId,
      templateValues: JSON.parse(templateValues),
    }, httpOptionsWithToken);
  }
}
