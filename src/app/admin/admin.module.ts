import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './template/template.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { ChartsModule } from 'ng2-charts';
import { KeysComponent } from './keys/keys.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { PlanComponent } from './plan/plan.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    TemplatesComponent,
    TemplateComponent,
    KeysComponent,
    PlanComponent,
  ],
  providers: [
    AdminService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ChartsModule,
    NgbModule,
    NgbNavModule,
    HighlightPlusModule,
    FormsModule,
    CodemirrorModule
  ]
})
export class AdminModule { }
