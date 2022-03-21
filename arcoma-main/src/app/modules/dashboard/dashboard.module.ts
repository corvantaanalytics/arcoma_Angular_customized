import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreCommonModule,
    ContentHeaderModule
  ]
})
export class DashboardModule { }
