import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class UserViewService implements Resolve<any> {
  public rows: any;
  public onDatatablessChanged: BehaviorSubject<any>;
  public id;

  /**
  * Constructor
  *
  * @param {HttpClient} _httpClient
  */
 constructor(private _httpClient: HttpClient) {
   // Set the defaults
   this.onDatatablessChanged = new BehaviorSubject({});
 }

 /**
  * Resolver
  *
  * @param {ActivatedRouteSnapshot} route
  * @param {RouterStateSnapshot} state
  * @returns {Observable<any> | Promise<any> | any}
  */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/invoice-data').subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
