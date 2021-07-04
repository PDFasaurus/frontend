import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { CookieService } from '../../cookie.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS } from '../../constants';
import * as moment from 'moment';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  providers: [AdminService, CookieService],
})
export class TemplatesComponent implements OnInit {
  closeResult: any = '';
  name: string = '';
  error: string;
  templates: any[] = [];

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.getTemplates()
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get liveTemplates() {
    return this.templates;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getTemplates() {
    this.adminService
    .getTemplates(this.cookieService.getCookie(AUTH_COOKIE))
    .subscribe((templates: any) => {
      this.templates = templates;
    }, (err) => {
      this.error = ERRORS.GENERIC;
    });
  }

  createTemplate() {
    this.adminService
    .createTemplate(this.name, this.cookieService.getCookie(AUTH_COOKIE))
    .subscribe((template: any) => {
      this.templates.push(template);
      this.modalService.dismissAll('Done')
      this.name = "";
    }, (err) => {
      console.log(err)
      this.error = ERRORS.GENERIC;
    });
  }
}
