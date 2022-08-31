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
const Employee = require('../models/employee');
const BaseResponse = require('../models/base-response');

const router = express.Router();


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
 *        description: Employee Documents
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
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
      } else {
        console.log(emp);
        if (emp) {
          const findEmployeeByIdResponse = new BaseResponse(200, 'Query successful', emp);
          res.json(findEmployeeByIdResponse.toObject());
        } else {
          const notFoundEmployeeResponse = new BaseResponse(200, 'Invalid employee ID. Please try again.', null);
          console.log(notFoundEmployeeResponse.toObject());
          res.json(notFoundEmployeeResponse.toObject());
        }

      }
    })
  } catch (e) {
    console.log(e);
    const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
    res.status(500).send(errorResponse.toObject());
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
