import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
  

  this.contentHeader = {
    headerTitle: 'Dashboard',
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
          name: 'Home',
          isLink: false
        }
      ]
    }
  };

  }
}
