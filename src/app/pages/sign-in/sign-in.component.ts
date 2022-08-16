/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket sign-in component
; Code Attribution: Additional code from buwebdev
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from 'src/app/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private signinService: SignInService) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      empId: ''
    })
  }

  onSubmit() { // submission for employee ID
    const formValues = this.signinForm.value;
    const empId = formValues.empId;

    if (this.signinService.validate(empId)) {
      this.cookieService.set('session_user', empId);
      this.router.navigate(['/'])
    } else {
      this.errorMessage = 'The employee ID is wrong';
    }
  }
  showHint: boolean = false;
}
