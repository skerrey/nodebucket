/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket employee API routes
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// findEmployeeById
router.get('/employees/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Server Error: ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
})

/* createEmployee */
router.post("/employees", async(req, res) => {
	try {
		const newEmployee = {
      empId: req.body.empId,
			firstName: req.body.firstName,
			lastName: req.body.lastName
    };
		Employee.create(newEmployee, function (err, emp) {
			if (err) {
        console.log(err);
				res.status(501).send({
          'err': 'MongoDB Server Error: ' + err.message
        })
			} else {
        console.log(emp);
				res.status(200).send({
          "message": "Employee created"
        })
			}
		})
	} catch (e) {
		console.log(e);
		res.status(500).send({
      'err': 'Internal server error!'
	  })
	}
})

module.exports = router;
