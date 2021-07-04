import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';
import { TemplatesComponent } from './templates/templates.component';
import { KeysComponent } from './keys/keys.component';
import { PlanComponent } from './plan/plan.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'templates', component: TemplatesComponent, },
      { path: 'templates/:templateId', component: TemplateComponent, },
      { path: 'keys', component: KeysComponent, },
      { path: 'plan', component: PlanComponent, },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
