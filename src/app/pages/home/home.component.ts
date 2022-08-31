/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket home component ts
; Code Attribution: Additional code from buwebdev
;   drag-n-drop code from material.angular.io [ref:A]
;     https://material.angular.io/cdk/drag-drop/examples
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { TaskService } from 'src/app/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  doing: Item[];
  done: Item[];
  empId: string;
  sessionName: string;

  taskForm: FormGroup = this.fb.group({
    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })




  constructor(private fb: FormBuilder, private cookieService: CookieService, private taskService: TaskService) {
    this.empId = this.cookieService.get('session_user'), 10;
    this.employee = {} as Employee;
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.sessionName = this.cookieService.get('session_name');

    // Subscribe to the taskService observable
    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);

      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.doing = this.employee.doing;
        this.done = this.employee.done;
      }
    })
   }

  ngOnInit(): void {
  }

  // Create task
  createTask() {
    const newTask = this.taskForm.controls['task'].value;

    // Call service
    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => { // error function
        console.log(e);
      },
      complete: () => { // complete function
        this.todo = this.employee.todo;
        this.doing = this.employee.doing;
        this.done = this.employee.done;
        this.taskForm.controls['task'].setErrors({'incorrect': false}); // Clears errors in form.
      }
    })
  }
}
