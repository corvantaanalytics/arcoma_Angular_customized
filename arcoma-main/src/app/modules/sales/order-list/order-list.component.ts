import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { SalesService } from 'app/services/sales.service';
import { SalesDetails } from 'app/interface/sales-details';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderListComponent implements OnInit {
  public contentHeader: object;
  public data: any;
  public salesData: SalesDetails;
  public selectedOption = 10;
  public rows = [
    {
      id: '1001',
      transactionId: '5252525252',
      clientName: 'ALUPCO',
      address: {
        addressLine1: 'No 20',
        addressLine2: 'South Street',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600000'
      },
      amount: '5000',
      paymentStatus: 'Paid',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '26-10-2020',
    }
  ];
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Processing', value: 'Processing' },
    { name: 'Shipped', value: 'Shipped' },
    { name: 'Delivered', value: 'Delivered' },
    { name: 'Cancelled', value: 'Cancelled' }
  ];

  public selectedStatus = [];
  public searchValue = '';

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [
    {
      id: '1001',
      transactionId: '5252525252',
      clientName: 'Hari',
      address: {
        addressLine1: 'No 20',
        addressLine2: 'South Street',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600000'
      },
      amount: '5000',
      paymentStatus: 'Paid',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '26-10-1996',
    }
  ];
  private _unsubscribeAll: Subject<any>;
  public tempFilterData;
  public previousStatusFilter = '';

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {SalesService} _salesService
   */
  constructor(private _salesService: SalesService, private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.contentHeader = {
      headerTitle: 'Sales',
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Orders',
            isLink: false
          }
        ]
      }
    };

  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.clientName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.orderStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  initiallize() {
    this.salesData = {
      clientName: '',
      address: { "addressLine1": '', "addressLine2": '', "city": '', "state": '', "pincode": '' }
    };
  }
}
