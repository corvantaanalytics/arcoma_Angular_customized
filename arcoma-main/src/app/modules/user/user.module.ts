import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { UserRoutingModule } from './user-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserService } from 'app/services/user.service';
import { UserListService } from './user-list/user-list.service';
import { UserViewService } from './user-view/user-view.service';
import { UserEditService } from './user-edit/user-edit.service';

@NgModule({
  declarations: [
    UserEditComponent,
    UserListComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  providers: [UserService, UserListService, UserViewService, UserEditService],
  exports: [UserEditComponent]
})
export class UserModule { }
