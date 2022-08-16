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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // [ref:A]
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  doing = ['Call friend', 'Eat lunch'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  // [/ref:A]

  constructor() { }

  ngOnInit(): void {
  }

}
