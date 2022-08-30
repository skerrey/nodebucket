/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket employee model
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = require('./item');


let employeeSchema = new Schema({ // Employee Schema
  empId: {type: String, unique: true, required: true },
  firstName: {type: String},
  lastName: {type: String},
  todo: [itemSchema],
  doing: [itemSchema],
  done: [itemSchema]
}, { collection: 'employees'}); // specify connection

// Export module
module.exports = mongoose.model("Employee", employeeSchema);
