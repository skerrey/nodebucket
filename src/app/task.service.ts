/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket task service
; Code Attribution: Additional code from buwebdev
;===========================================
*/

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * findAllTasks - returns all tasks
   */

  findAllTasks(empId: string): Observable<any> {
    return this.http.get('api/employees/' + empId + '/tasks');
  }

  /**
   * createTask - creates a task
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      // Define HTTP body of request.
      text: task
    })
  }
}
