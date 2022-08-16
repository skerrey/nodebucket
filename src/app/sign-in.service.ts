/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket sign-in service
; Code Attribution: Additional code from buwebdev
;===========================================
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  empId: Array<string>;

  constructor() { // passwords
    this.empId = [
      '1007',
      '1008',
      '1009',
      '1010',
      '1011'
    ];
  }

  validate(empId: string) { // validates empId from string array
    return this.empId.some(id => id === empId);
  }
}
