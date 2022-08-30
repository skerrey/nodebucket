/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 29 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket item model
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
