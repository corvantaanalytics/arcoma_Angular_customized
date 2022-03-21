import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
import { ProductCreateService } from 'app/services/product-create.service';
import { ProductDetails } from 'app/interface/product-details';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.scss']
})
export class ProductCreateEditComponent implements OnInit {

 form: FormGroup;
 public productData: ProductDetails;
 public tempRow;
 public avatarImage: string;
 public Editor = ClassicEditor;
 desc = 'Specification';
 data: any = `<p>Hello, world!</p>`;
 paramData: string;
 paramMode: string;
 headText: string;
 readMode = false;
 urls = [];

 public rows = [
  { id: '1001', productName: 'DS-200', categoryName: '202400', price: '1992', quantity:'NIL', availability: 'instock', company:'Intel', modelNumber: '‎BX8070811400', warranty: '3 Year', desc:' Complete Specification'},
  { id: '1002', productName: 'AMD Ryzen 5 3600 Processor', categoryName: 'Processor', price: '18000', quantity:'15', availability: 'instock', company:'AMD', warranty: '3 Year', desc:' Complete Specification'},
  { id: '1003', productName: 'AMD Ryzen 5 3100 Processor', categoryName: 'Processor', price: '8000', quantity:'0', availability: 'outofstock', company:'AMD', warranty: '3 Year', desc:' Complete Specification'},
  { id: '1004', productName: 'Intel Core i5-11400F Processor', categoryName: 'Processor', price: '13500', quantity:'2', availability: 'limited', company:'Intel', modelNumber: 'BX8070811400F', warranty: '3 Year', desc:' Complete Specification'}
  ];
 
 public selectAvailability: any = [
  { name: 'All', value: '' },
  { name: 'In Stock', value: 'instock' },
  { name: 'Out Of Stock', value: 'outofstock' },
  { name: 'Limited Quantity', value: 'limited' }
];

 constructor(public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _productCreateService: ProductCreateService,) { }

 ngOnInit() {
  this.initiallize();
  this.form = this.fb.group({
    productName: ['', Validators.required],
    categoryName: ['', Validators.required],
    availability: ['', Validators.required],
    price: ['', [Validators.required, Validators.maxLength(10)]],
    quantity: ['', Validators.required, Validators.maxLength(5)],
    company: [''],
    modelNumber: ['', Validators.required],
    warranty: ['', Validators.required],
    editor: ['', Validators.required],
  });

  this.paramData = this.route.snapshot.paramMap.get('id');
  this.paramMode = this.route.snapshot.paramMap.get('mode');

  if(this.paramData){
    this.rows.map(row => {
      if (row.id == this.paramData) {
        this.productData = row;
      }
    });
  }

  if(this.paramMode === 'edit'){
    this.headText = 'Edit Product Details';
  } else if (this.paramMode === 'add'){
    this.headText = 'Add New Product';
  } else {
    this.headText = 'Product Details';
    this.readMode = true;
  }

}

 resetForm() {
   this.form.reset();
   this.urls = [];
 }

 uploadImage(event: any) {
   if (event.target.files && event.target.files[0]) {
     let reader = new FileReader();

     reader.onload = (event: any) => {
       this.avatarImage = event.target.result;
     };

     reader.readAsDataURL(event.target.files[0]);
   }
 }

 onSubmit() {
  
 }

 back(){
  this.router.navigate(['product/list'])
 }

 initiallize() {
  this.productData = {
    productName: '',
  };
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  // console.log(event.target.result);
                   this.urls.push(event.target.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  removeImage(i){
    this.urls.splice(i,1);
  }


}




// import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';

// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { FlatpickrOptions } from 'ng2-flatpickr';
// import { cloneDeep } from 'lodash';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ProductCreateService } from 'app/services/product-create.service';
// import { ProductDetails } from 'app/interface/product-details';

// @Component({
//   selector: 'app-product-create-edit',
//   templateUrl: './product-create-edit.component.html',
//   styleUrls: ['./product-create-edit.component.scss']
// })
// export class ProductCreateEditComponent implements OnInit {
//  // Public
//  public url = this.router.url;
//  public urlLastValue;
//  public rows = [
//   { id: '1001', productName: 'Intel Core i5-11400 Processor', categoryName: 'Processor', price: '16000', quantity:'10', availability: 'instock', company:'Intel', modelNumber: '‎BX8070811400', warranty: '3 Year'},
//   { id: '1002', productName: 'AMD Ryzen 5 3600 Processor', categoryName: 'Processor', price: '18000', quantity:'15', availability: 'instock', company:'AMD', warranty: '3 Year'},
//   { id: '1003', productName: 'AMD Ryzen 5 3100 Processor', categoryName: 'Processor', price: '8000', quantity:'0', availability: 'outofstock', company:'AMD', warranty: '3 Year'},
//   { id: '1004', productName: 'Intel Core i5-11400F Processor', categoryName: 'Processor', price: '13500', quantity:'2', availability: 'limited', company:'Intel', modelNumber: 'BX8070811400F', warranty: '3 Year'}
//   ];
//  public productData: ProductDetails;
//  public tempRow;
//  urls = [];
//  public avatarImage: string;
//  public selectAvailability: any = [
//   { name: 'All', value: '' },
//   { name: 'In Stock', value: 'instock' },
//   { name: 'Out Of Stock', value: 'outofstock' },
//   { name: 'Limited Quantity', value: 'limited' }
// ];
//  public Editor = ClassicEditor;
//  desc = 'Specification';
//  data: any = `<p>Hello, world!</p>`;
//  paramData: string;

//  @ViewChild('accountForm') accountForm: NgForm;

//  public birthDateOptions: FlatpickrOptions = {
//    altInput: true
//  };


//  // Private
//  private _unsubscribeAll: Subject<any>;

//  /**
//   * Constructor
//   *
//   * @param {Router} router
//   * @param {ProductCreateService} _productCreateService
//   */
//  constructor(private router: Router, private route: ActivatedRoute, private _productCreateService: ProductCreateService) {
//    this._unsubscribeAll = new Subject();
//    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
//  }

//  // Public Methods
//  // -----------------------------------------------------------------------------------------------------

//  /**
//   * Reset Form With Default Values
//   */
//  resetFormWithDefaultValues() {
//    this.accountForm.resetForm(this.tempRow);
//  }

//  /**
//   * Upload Image
//   *
//   * @param event
//   */
//  uploadImage(event: any) {
//    if (event.target.files && event.target.files[0]) {
//      let reader = new FileReader();

//      reader.onload = (event: any) => {
//        this.avatarImage = event.target.result;
//      };

//      reader.readAsDataURL(event.target.files[0]);
//    }
//  }

//  /**
//   * Submit
//   *
//   * @param form
//   */
//  submit(form) {
//    if (form.valid) {
//      console.log('Submitted...!');
//    }
//  }

//  back(){
//   this.router.navigate(['product/list'])
//  }

//  initiallize() {
//   this.productData = {
//     productName: '',
//   };
//   }
  
//   onSelectFile(event) {
//     if (event.target.files && event.target.files[0]) {
//         var filesAmount = event.target.files.length;
//         for (let i = 0; i < filesAmount; i++) {
//                 var reader = new FileReader();

//                 reader.onload = (event:any) => {
//                   console.log(event.target.result);
//                    this.urls.push(event.target.result); 
//                 }

//                 reader.readAsDataURL(event.target.files[i]);
//         }
//     }
//   }

//  // Lifecycle Hooks
//  // -----------------------------------------------------------------------------------------------------
//  /**
//   * On init
//   */
//  ngOnInit(): void {
//     this.paramData = this.route.snapshot.paramMap.get('id');
//     this.initiallize();
//     console.log(this.urlLastValue);
//   //  this._productCreateService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
//     if(this.paramData){
//       this.rows.map(row => {
//         if (row.id == this.urlLastValue) {
//           this.productData = row;
//          //  this.avatarImage = this.currentRow.avatar;
//          //  this.tempRow = cloneDeep(row);
//         }
//       });
//     }
//   //  });
//  }

//  /**
//   * On destroy
//   */
//  ngOnDestroy(): void {
//    // Unsubscribe from all subscriptions
//    this._unsubscribeAll.next();
//    this._unsubscribeAll.complete();
//  }
// }

