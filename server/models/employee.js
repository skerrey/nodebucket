/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket employee & task model
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({ // Task Schema
  text: {type: String}
});

let employeeSchema = new Schema({ // Employee Schema
  empId: {type: String, unique: true, dropDups: true, required: true },
  firstName: {type: String},
  lastName: {type: String},
  todo: [taskSchema],
  doing: [taskSchema],
  done: [taskSchema]
}, { collection: 'employees'}); // specify connection

// Export module
module.exports = mongoose.model("Employee", employeeSchema);
