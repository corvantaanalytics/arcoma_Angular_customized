import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
public contentHeader: object;
public sidebarToggleRef = false;
 public rows = [
  { id: 1001, productName: 'DS-200', categoryName: '202400', price: 1993, quantity:1.957, availability: 'instock'},
  { id: 1002, productName: 'DSB-200 ', categoryName: '202046', price: 1989, quantity:1.8945, availability: 'instock'},
  { id: 1003, productName: 'DSB-200', categoryName: '202203', price: 1991, quantity:1.9456, availability: 'outofstock'},
  { id: 1004, productName: 'DSB-241/10', categoryName: '1003', price: 2003, quantity:1.8989, availability: 'limited'}
  ];
 public selectedOption = 10;
 public ColumnMode = ColumnMode;
 public temp = [];
 public previousStatusFilter = '';

 public selectAvailability: any = [
  { name: 'All', value: '' },
  { name: 'In Stock', value: 'instock' },
  { name: 'Out Of Stock', value: 'outofstock' },
  { name: 'Limited Quantity', value: 'limited' }
];

 public selectedAvailability = [];
 public searchValue = '';

 @ViewChild(DatatableComponent) table: DatatableComponent;

 private tempData = [
  { id: 1001, productName: 'Intel Core i5-11400 Processor', categoryName: 'Processor', price: 16000, quantity:10, availability: 'instock'},
  { id: 1002, productName: 'AMD Ryzen 5 3600 Processor', categoryName: 'Processor', price: 18000, quantity:15, availability: 'instock'},
  { id: 1003, productName: 'AMD Ryzen 5 3100 Processor', categoryName: 'Processor', price: 8000, quantity:0, availability: 'outofstock'},
  { id: 1004, productName: 'Intel Core i5-11400F Processor', categoryName: 'Processor', price: 13500, quantity:0, availability: 'limited'}
 ];
 private _unsubscribeAll: Subject<any>;

 constructor(
   private _productService: ProductService,
   private _coreSidebarService: CoreSidebarService,
   private _coreConfigService: CoreConfigService,
   private router: Router) {
   this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Products',
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
     return d.productName.toLowerCase().indexOf(val) !== -1 || !val;
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
      const isPartialNameMatch = row.availability.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  editProduct(id){ 
    if (id) {
      this.router.navigate(['/product/edit', id, {mode:'edit'}]);
    }
  }

  viewProduct(id){
    console.log('test');
    if (id) {
      this.router.navigate(['/product/view', id, {mode:'view'}]);
    }
  }
  deleteProduct(productName){
    console.log('test');
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Product:  ' +productName,
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
          text: 'Product has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });  
      }
    });
  //  this.rows = this.rows.filter(item => item.id !== id);
  }

  createProduct(){
    this.router.navigate(['/product/create', {mode:'add'}])
  }
}

