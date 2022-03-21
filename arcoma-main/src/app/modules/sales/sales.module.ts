import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SalesRoutingModule } from './sales-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { SalesService } from 'app/services/sales.service';


@NgModule({
  declarations: [OrderListComponent, TransactionListComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    CoreCommonModule,
    CoreDirectivesModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    FormsModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule,
    ContentHeaderModule
  ],
  providers: [SalesService],
  exports: [OrderListComponent]
})
export class SalesModule { }
