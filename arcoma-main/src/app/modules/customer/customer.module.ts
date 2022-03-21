import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateEditComponent } from './customer-create-edit/customer-create-edit.component';
import { CustomerService } from 'app/services/customer.service';
import { CustomerCreateService } from 'app/services/customer-create.service';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateEditComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    CKEditorModule,
    ContentHeaderModule,
    QuillModule.forRoot(),
  ],
  providers: [CustomerService, CustomerCreateService]
})
export class CustomerModule { }
