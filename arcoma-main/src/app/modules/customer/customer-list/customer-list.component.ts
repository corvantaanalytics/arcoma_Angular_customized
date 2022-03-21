import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CustomerService } from 'app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnInit {
  public contentHeader: object;
  public sidebarToggleRef = false;
  public rows = [
    {
      id: '101',
      customerName: 'ALUPCO',
      address: 'KHALEEJ DIST.', 
      city: 'RIYADH',
      email:'alupco@gmail.com',
      contact: '+9660124830'
    },
    {
      id: '102',
      customerName: 'AL HAMRANI RESIN',
      address: 'No 10 West street',
      city: 'JEDDAH',
      email:'alhmrani@gmail.com',
      contact: '+9664512368'
    },
    {
      id: '103',
      customerName: 'AL-SHOQAIQ WATER',
      address: 'No 23 Middle Street',
      city: 'DAMMAM',
      email:'alshoqaiq@gmail.com',
      contact: '+9664512423'
    },
    {
      id: '104',
      customerName: 'ALYAF',
      address: 'No 125 Main road',
      city: 'DAMMAM',
      email:'kalyaf@hotmail.com',
      contact: '+9664512434'
    },
    {
      id: '105',
      customerName: 'ARAKAN PAPER CUPS',
      address: 'No 63 South Street',
      city: 'DAMMAM',
      email:'arakan@gmail.com',
      contact: '+9666551234'
    }
  
  ];
  public selectedOption = 10;
 public ColumnMode = ColumnMode;
 public temp = [];
 public previousStatusFilter = '';

 public selectAvailability: any = [
  { name: 'All', value: '' },
  { name: 'Chennai', value: 'chennai' },
  { name: 'Madurai', value: 'madurai' },
  { name: 'Trichy', value: 'trichy' }
];

public selectedAvailability = [];
 public searchValue = '';

 @ViewChild(DatatableComponent) table: DatatableComponent;

 private tempData = [
  {
    id: '101',
    customerName: 'Hari',
    address: 'No 20 South Street', 
    city: 'Chennai',
    email:'priya103@gmail.com',
    contact: '1234567890'
  },
  {
    id: '102',
    customerName: 'Ram',
    address: 'No 10 West street',
    city: 'Trichy',
    email:'ram102@yahoo.com',
    contact: '9874512368'
  },
  {
    id: '103',
    customerName: 'Priya',
    address: 'No 23 Middle Street',
    city: 'Chennai',
    email:'priya103@gmail.com',
    contact: '7854123069'
  },
  {
    id: '104',
    customerName: 'Kumar',
    address: 'No 125 Main road',
    city: 'Trichy',
    email:'kumar104@hotmail.com',
    contact: '3541298076'
  },
  {
    id: '105',
    customerName: 'Anu',
    address: 'No 63 South Street',
    city: 'Madurai',
    email:'anu105@gmail.com',
    contact: '8741236950'
  }
];
private _unsubscribeAll: Subject<any>;

  constructor(
   private _customerService: CustomerService,
   private _coreSidebarService: CoreSidebarService,
   private _coreConfigService: CoreConfigService,
   private router: Router) { 
    this._unsubscribeAll = new Subject();

   }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Customers',
      breadcrumb: {
        type: '',
        links: [
          // {
          //   name: 'Home',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'eCommerce',
          //   isLink: true,
          //   link: '/'
          // },
          {
            name: 'List',
            isLink: false
          }
        ]
      }
    };
  }
  filterUpdate(event) {
    this.selectedAvailability = this.selectAvailability[0];
 
    const val = event.target.value.toLowerCase();
 
    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.customerName.toLowerCase().indexOf(val) !== -1 || !val;
    });
 
    this.rows = temp;
    this.table.offset = 0;
  }
 
   filterByStatus(event) {
     const filter = event ? event.value : '';
     this.previousStatusFilter = filter;
     this.temp = this.filterRows(filter);
     this.rows = this.temp;
   }
 
   filterRows(statusFilter): any[] {
     // Reset search on select change
     this.searchValue = '';
 
     statusFilter = statusFilter.toLowerCase();
 
     return this.tempData.filter(row => {
       const isPartialNameMatch = row.city.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
       return isPartialNameMatch;
     });
   }
 
  //  editCustomer(id){
  //    if (id) {
  //      this.router.navigate(['/customer/edit', id, {mode:'edit'}]);
  //    }
  //  }
 
   viewCustomer(id){
     console.log('test');
     if (id) {
       this.router.navigate(['/customer/view', id, {mode:'view'}]);
     }
   }
   deleteCustomer(customerName){
    console.log('test');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete Customer:  " +customerName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Customer has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }
 
   createCustomer(){
     this.router.navigate(['/customer/edit', {mode:'add'}])
   }

}
