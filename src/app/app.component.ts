/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket app component ts
; Code Attribution: Additional code from buwebdev
;   import svg icons to mat-icon from digitalocean by WeiHung Chin
;     https://www.digitalocean.com/community/tutorials/angular-custom-svg-icons-angular-material
;===========================================
*/

import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "owl",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/owl_icon.svg")
    );
  }
}
