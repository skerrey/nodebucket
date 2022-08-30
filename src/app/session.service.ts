/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket session service
; Code Attribution: Additional code from buwebdev
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

/**
 * findEmployeeById - find employee by Id with observable
 */
  findEmployeeById(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId)
  }
}
