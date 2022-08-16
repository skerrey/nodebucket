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


/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *  get:
 *    tags:
 *      - Employees
 *    description: API for returning a single employee object from MongoDB
 *    summary: Returns an employee document
 *    parameters:
 *      -   name: empId
 *          in: path
 *          required: true
 *          description: The empId requested by the user.
 *          schema:
 *            type: string
 *    responses:
 *      "200":
 *        description: Composer Documents
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

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
        res.status(200).send({
          emp
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
