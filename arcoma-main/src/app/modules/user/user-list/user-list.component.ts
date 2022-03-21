import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  public contentHeader: object;
  public sidebarToggleRef = false;
  public rows = [
    {
      id: '101',
      fullName: 'SHAMS',
      address: 'No 20 South Street', 
      city: 'DAMMAM',
      email:'shams@gmail.com',
      contact: '+96623244223'
    },
    {
      id: '102',
      fullName: 'ASFAQ',
      address: 'No 10 West street',
      city: 'JEDDAH',
      email:'asfaq@yahoo.com',
      contact: '+96623244223'
    },
    {
      id: '103',
      fullName: 'MOHAMMED',
      address: 'No 23 Middle Street',
      city: 'RIYADH',
      email:'mohammed@gmail.com',
      contact: '+96623244223'
    },
    {
      id: '104',
      fullName: 'AZAR',
      address: 'No 125 Main road',
      city: 'RIYADH',
      email:'azar@hotmail.com',
      contact: '+96623244223'
    },
    {
      id: '105',
      fullName: 'OMAR',
      address: 'No 63 South Street',
      city: 'DAMMAM',
      email:'omar@gmail.com',
      contact: '+96623244223'
    }

  ];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousStatusFilter = '';

  public selectAvailability: any = [
  { name: 'All', value: '' },
  { name: 'RIYADH', value: 'riyadh' },
  { name: 'JEDDAH', value: 'jeddah' },
  { name: 'DAMMAM', value: 'dammam' }
];

  public selectedAvailability = [];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  private tempData = [
    {
      id: '101',
      fullName: 'Hari',
      address: 'No 20 South Street', 
      city: 'Chennai',
      email:'priya103@gmail.com',
      contact: '1234567890'
    },
    {
      id: '102',
      fullName: 'Ram',
      address: 'No 10 West street',
      city: 'Trichy',
      email:'ram102@yahoo.com',
      contact: '9874512368'
    },
    {
      id: '103',
      fullName: 'Priya',
      address: 'No 23 Middle Street',
      city: 'Chennai',
      email:'priya103@gmail.com',
      contact: '7854123069'
    },
    {
      id: '104',
      fullName: 'Kumar',
      address: 'No 125 Main road',
      city: 'Trichy',
      email:'kumar104@hotmail.com',
      contact: '3541298076'
    },
    {
      id: '105',
      fullName: 'Anu',
      address: 'No 63 South Street',
      city: 'Madurai',
      email:'anu105@gmail.com',
      contact: '8741236950'
    }
  ];
  private _unsubscribeAll: Subject<any>;
  
  constructor(
   private _userService: UserService,
   private _coreSidebarService: CoreSidebarService,
   private _coreConfigService: CoreConfigService,
   private router: Router
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Users',
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
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
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
 
   editUser(id){
     if (id) {
       this.router.navigate(['/user/list', id, {mode:'edit'}]);
     }
   }
 
   viewUser(id){
     console.log('test');
     if (id) {
       this.router.navigate(['/user/view', id, {mode:'view'}]);
     }
   }
   deleteUser(fullName){
    console.log('test');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete User:  " +fullName,
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
          text: 'User has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }

   createUser(){
     this.router.navigate(['/user/edit', {mode:'add'}])
   }
}
