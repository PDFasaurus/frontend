import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'codemirror/mode/handlebars/handlebars';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { CookieService } from '../../cookie.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS } from '../../constants';
import * as moment from 'moment';
import { API_PATH } from '../../constants';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  providers: [AdminService, CookieService],
})
export class TemplateComponent implements OnInit {
  content: string = "";
  templateValues: string = "{\"name\":\"Blue dino\"}";
  uuid:string;
  name:string;
  error: string;
  notification: string;
  templateId: string;
  width: number;
  height: number;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cookieService: CookieService,
    private routerService: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.templateId = this.routerService.snapshot.params.templateId;

    this.adminService
      .getTemplate(this.templateId, this.cookieService.getCookie(AUTH_COOKIE))
      .subscribe((res: any) => {
        const { uuid, name, content, width, height } = res;

        this.uuid = uuid;
        this.name = name;
        this.content = content;
        this.width = width;
        this.height = height;
    }, (err) => {
      this.error = ERRORS.GENERIC;
    });
  }

  save() {
    this.adminService
      .updateTemplate(this.templateId, this.content, this.name, this.width, this.height, this.cookieService.getCookie(AUTH_COOKIE))
      .subscribe((res: any) => {
        this.notification = "Successfully updated";
    }, (err) => {
      this.error = ERRORS.GENERIC;
    });
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.adminService
        .deleteTemplate(this.templateId, this.content, this.name, this.cookieService.getCookie(AUTH_COOKIE))
        .subscribe((res: any) => {
          this.router.navigate(['/admin/templates'])
      }, (err) => {
        this.error = ERRORS.GENERIC;
      });
    }
  }

  copyToClipboard() {
    var input = document.createElement('input');
    input.setAttribute('value', this.uuid);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  preview() {
    if (!this.isJsonString(this.templateValues)) return this.error = "Invalid JSON"
    window.open(API_PATH + '/templates/'+this.templateId+'/preview?values='+this.templateValues)
    this.error = null;
  }
}
