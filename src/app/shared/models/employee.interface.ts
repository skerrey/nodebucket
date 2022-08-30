/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket employee interface
; Code Attribution: Additional code from buwebdev
;===========================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
  todo: Item[];
  doing: Item[];
  done: Item[];
}
