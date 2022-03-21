import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { UserViewService } from './user-view.service';
import { UserDetails } from 'app/interface/user-details';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserViewComponent implements OnInit {
  public contentHeader: object;
  public data: any;
  public userData: UserDetails;
  public selectedOption = 10;
  paramData: string;
  paramMode: string;
  headText: string;
  readMode = false;
  urls = [];
  public rows = [
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
      amount: '500',
      paymentStatus: 'CLOSED',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '26-10-1996',
    },
    {
      id: '104',
      transactionId: '5248451526',
      clientName: 'ALYAF',
      address: {
        addressLine1: 'No 10',
        addressLine2: 'West Street',
        city: 'Trichy',
        state: 'TamilNadu',
        pincode: '602025'
      },
      amount: '1000',
      paymentStatus: 'IN PROGRESS',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '26-1-1997',
    },
    {
      id: '105',
      transactionId: '5252789634',
      clientName: 'ARAKAN PAPER CUPS',
      address: {
        addressLine1: 'No 23',
        addressLine2: 'Middle Street',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600081'
      },
      amount: '2500',
      paymentStatus: 'ESCALATED',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '02-07-1996',
    },
    {
      id: '101',
      transactionId: '5252354785',
      clientName: 'ALUPCO',
      address: {
        addressLine1: 'No 125',
        addressLine2: 'Main Road',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600063'
      },
      amount: '3000',
      paymentStatus: 'CLOSED',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '06-05-1996',
    },
    {
      id: '103',
      transactionId: '5252968574',
      clientName: 'AL-SHOQAIQ',
      address: {
        addressLine1: 'No 63',
        addressLine2: 'South Street',
        city: 'Madurai',
        state: 'TamilNadu',
        pincode: '616002'
      },
      amount: '7000',
      paymentStatus: 'IN PROGRESS',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '18-12-1996',
    }
  ];
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    {name : 'All', value: ''},
    {name : 'CLOSED', value: 'Closed'},
    {name : 'IN PROGRESS', value: 'Inprogress'},
    {name : 'ESCALATED', value: 'Escalated'},
    {name : 'UNRESOLVED', value: 'Unresolved'},
    {name : 'DUMMY', value: 'Dummy'},
    {name : 'NOT IN SCOPE', value: 'Notinscope'}
    ];

  public selectedStatus = [];
  public searchValue = ""
  
  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;  

  // private
  private tempData = [
    {
      id: '101',
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
    },
    {
      id: '102',
      transactionId: '5248451526',
      clientName: 'Ram',
      address: {
        addressLine1: 'No 10',
        addressLine2: 'West Street',
        city: 'Trichy',
        state: 'TamilNadu',
        pincode: '602025'
      },
      amount: '10000',
      paymentStatus: 'Partial Payment',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '26-1-1997',
    },
    {
      id: '103',
      transactionId: '5252789634',
      clientName: 'Priya',
      address: {
        addressLine1: 'No 23',
        addressLine2: 'Middle Street',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600081'
      },
      amount: '25000',
      paymentStatus: 'Past Due',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '02-07-1996',
    },
    {
      id: '104',
      transactionId: '5252354785',
      clientName: 'Kumar',
      address: {
        addressLine1: 'No 125',
        addressLine2: 'Main Road',
        city: 'Chennai',
        state: 'TamilNadu',
        pincode: '600063'
      },
      amount: '3000',
      paymentStatus: 'Sent',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '06-05-1996',
    },
    {
      id: '105',
      transactionId: '5252968574',
      clientName: 'Anu',
      address: {
        addressLine1: 'No 63',
        addressLine2: 'South Street',
        city: 'Madurai',
        state: 'TamilNadu',
        pincode: '616002'
      },
      amount: '7000',
      paymentStatus: 'Draft',
      paymentType: 'Credit Card',
      orderStatus: 'Processing',
      orderDate: '18-12-1996',
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
  constructor(private _userViewService: UserViewService, private router: Router, private route: ActivatedRoute, private  _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    if(this.paramMode === 'edit'){
      this.headText = 'Edit User Details';
    } else if (this.paramMode === 'add'){
      this.headText = 'Add New User';
    } else {
      this.headText = 'User Details';
      this.readMode = true;
    }
  }
  back(){
    this.router.navigate(['user/list'])
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
    this.userData = {
      fullName: '',
      address: '',
      city: '',
      email: '',
      contact: ''
    };
  }

}
