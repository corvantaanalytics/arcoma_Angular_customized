import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateService } from 'app/services/product-create.service';
import { ProductService } from 'app/services/product.service';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
    resolve: {
      uls: ProductService
    },
  },
  {
    path: 'create',
    component: ProductCreateEditComponent,
    resolve: {
      ues: ProductCreateService
    },
  },
  {
    path: 'edit/:id',
    component: ProductCreateEditComponent,
    resolve: {
      ues: ProductCreateService
    },
  },
  {
    path: 'view/:id',
    // component: ProductDetailsComponent,
    component: ProductCreateEditComponent,
    resolve: {
      ues: ProductService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
