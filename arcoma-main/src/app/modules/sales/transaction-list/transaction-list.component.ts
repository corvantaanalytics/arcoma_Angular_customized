import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { SalesService } from 'app/services/sales.service';
import { SalesDetails } from 'app/interface/sales-details';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit {
  public contentHeader: object;
  public data: any;
  public selectedOption = 10;
  public transactionData: SalesDetails;
  public rows = [
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
      orderDate: '26-10-2020',
    }
  ];
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Downloaded', value: 'Downloaded' },
    { name: 'Draft', value: 'Draft' },
    { name: 'Paid', value: 'Paid' },
    { name: 'Partial Payment', value: 'Partial Payment' },
    { name: 'Past Due', value: 'Past Due' },
    { name: 'Sent', value: 'Sent' }
  ];

  public selectedStatus = [];
  public searchValue = '';

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [
    {
      id: '101',
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
            name: 'Transactions',
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
      const isPartialNameMatch = row.paymentStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  // ngOnInit(): void {
  //   // Subscribe config change
  //   this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
  //     // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
  //     if (config.layout.animation === 'zoomIn') {
  //       setTimeout(() => {
  //         this._salesService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
  //           this.data = response;
  //           this.rows = this.data;
  //           this.tempData = this.rows;
  //           this.tempFilterData = this.rows;
  //         });
  //       }, 450);
  //     } else {
  //       this._salesService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
  //         this.data = response;
  //         this.rows = this.data;
  //         this.tempData = this.rows;
  //         this.tempFilterData = this.rows;
  //       });
  //     }
  //   });
  // }

  /**
   * On destroy
   */
  // ngOnDestroy(): void {
  //   // Unsubscribe from all subscriptions
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }
}
