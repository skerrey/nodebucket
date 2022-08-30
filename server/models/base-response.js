/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket base response model
; Code Attribution: Additional code from buwebdev
;===========================================
*/

class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // Create object for return
  toObject () {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
