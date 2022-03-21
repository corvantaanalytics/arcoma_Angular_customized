import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
import { CustomerCreateService } from 'app/services/customer-create.service';
import { CustomerDetails } from 'app/interface/customer-details';

@Component({
  selector: 'app-customer-create-edit',
  templateUrl: './customer-create-edit.component.html',
  styleUrls: ['./customer-create-edit.component.scss']
})
export class CustomerCreateEditComponent implements OnInit {

 form: FormGroup;
 public customerData: CustomerDetails;
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

  public selectAvailability: any = [
  { name: 'All', value: '' },
  { name: 'JEDDAH', value: 'JEDDAH' },
  { name: 'DAMMAM', value: 'DAMMAM' },
  { name: 'RIYADH', value: 'RIYADH' }
];

// private tempData = [
//   {
//     id: '101',
//     fullName: 'Hari',
//     address: 'No 20 South Street', 
//     city: 'Chennai',
//     email:'priya103@gmail.com',
//     contact: '1234567890'
//   },
//   {
//     id: '102',
//     fullName: 'Ram',
//     address: 'No 10 West street',
//     city: 'Trichy',
//     email:'ram102@yahoo.com',
//     contact: '9874512368'
//   },
//   {
//     id: '103',
//     fullName: 'Priya',
//     address: 'No 23 Middle Street',
//     city: 'Chennai',
//     email:'priya103@gmail.com',
//     contact: '7854123069'
//   },
//   {
//     id: '104',
//     fullName: 'Kumar',
//     address: 'No 125 Main road',
//     city: 'Trichy',
//     email:'kumar104@hotmail.com',
//     contact: '3541298076'
//   },
//   {
//     id: '105',
//     fullName: 'Anu',
//     address: 'No 63 South Street',
//     city: 'Madurai',
//     email:'anu105@gmail.com',
//     contact: '8741236950'
//   }
// ];

  constructor(public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _customerCreateService: CustomerCreateService) { }

  ngOnInit() {
    this.initiallize();
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      contact: ['', Validators.required,],
      address: ['', Validators.required,],
    });
  
    this.paramData = this.route.snapshot.paramMap.get('id');
    this.paramMode = this.route.snapshot.paramMap.get('mode');

    if(this.paramData){
      this.rows.map(row => {
        if (row.id == this.paramData) {
          this.customerData = row;
        }
      });
    }

    if(this.paramMode === 'edit'){
      this.headText = 'Edit Customer Details';
    } else if (this.paramMode === 'add'){
      this.headText = 'Add New Customer';
    } else {
      this.headText = 'Customer Details';
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
    this.router.navigate(['customer/list'])
   }
  
   initiallize() {
    this.customerData = {
      customerName: '',
      address:'',
      city: '',
      email:''

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
