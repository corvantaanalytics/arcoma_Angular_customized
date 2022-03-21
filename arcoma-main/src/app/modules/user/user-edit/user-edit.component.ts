import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
import { UserEditService } from './user-edit.service';
import { UserDetails } from 'app/interface/user-details';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'] 
})
export class UserEditComponent implements OnInit {
  // Public
  form: FormGroup;
  public userData: UserDetails;
  public tempRow;
  public avatarImage: string;
  public Editor = ClassicEditor;
  paramData: string;
  paramMode: string;
  headText: string;
  readMode = false;
  urls = [];

  public rows = [
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
      city: 'Chennai',
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

  public selectAvailability: any = [
    { name: 'All', value: '' },
    { name: 'Chennai', value: 'chennai' },
    { name: 'Madurai', value: 'madurai' },
    { name: 'Trichy', value: 'trichy' }
  ];

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */

  constructor(public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _userService: UserEditService,) { }

  ngOnInit() {
    this.initiallize();
    this.form = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
  });

  this.paramData = this.route.snapshot.paramMap.get('id');
  this.paramMode = this.route.snapshot.paramMap.get('mode');

  if(this.paramData){
    this.rows.map(row => {
      if (row.id == this.paramData) {
        this.userData = row;
      }
    });
  }

  if(this.paramMode === 'edit'){
    this.headText = 'Edit User Details';
  } else if (this.paramMode === 'add'){
    this.headText = 'Add New Users';
  } else {
    this.headText = 'User Details';
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
   this.router.navigate(['user/list'])
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
