import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductSidebarComponent } from './product-list/new-product-sidebar/new-product-sidebar.component';
import { ProductService } from 'app/services/product.service';
import { ProductCreateService } from 'app/services/product-create.service';

@NgModule({
  declarations: [ProductListComponent, ProductCreateEditComponent, ProductDetailsComponent, NewProductSidebarComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
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
  providers: [ProductService, ProductCreateService]
})
export class ProductsModule { }
