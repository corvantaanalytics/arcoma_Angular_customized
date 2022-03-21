import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesService } from 'app/services/sales.service';
import { OrderListComponent } from './order-list/order-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderListComponent,
    resolve: {
      uls: SalesService
    },
    data: { animation: 'OrderListComponent' }
  },
  {
    path: 'transactions',
    component: TransactionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
