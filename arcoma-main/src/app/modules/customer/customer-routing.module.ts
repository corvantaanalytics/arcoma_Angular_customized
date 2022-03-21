import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateService } from 'app/services/customer-create.service';
import { CustomerService } from 'app/services/customer.service';
import { CustomerCreateEditComponent } from './customer-create-edit/customer-create-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: CustomerListComponent,
    // resolve: {
    //   uls: CustomerService
    // },
  },
  {
    path: 'edit',
    component: CustomerCreateEditComponent,
    resolve: {
      ues: CustomerCreateService
    },
  },
  {
    path: ' edit/:id',
    component: CustomerCreateEditComponent,
    resolve: {
      ues: CustomerCreateService
    },
  },
  {
    path: 'view/:id',
    // component: CustomerDetailsComponent,
    component: CustomerCreateEditComponent,
    resolve: {
      ues: CustomerCreateService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
