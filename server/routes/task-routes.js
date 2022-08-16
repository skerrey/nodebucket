/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket task routes
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");


// findAllTasks (from kerrey-node-shopper.routes.js)
router.get("/:empId/tasks", async(req, res) => {
  try {
    Employee.findOne({"empId": req.params.empId}, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Exception: ' + err.message
        })
      } else {
        console.log(emp.tasks);
        res.json(emp.tasks);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
        'err': 'Server Exception: ' + e.message
    })
  }
})

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Create task by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee Id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - todo
 *             properties:
 *               todo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *     responses:
 *       "200":
 *         description: Invoice added to MongoDB
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */

// createTask (from kerrey-node-shopper-routes.js)
router.post("/:empId/tasks", async(req, res) => {

  try {
    Employee.findOne({ "empId": req.params.empId }, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Exception' + err.message
        })
      } else {
        console.log(emp);
        res.status(200).send({
          'message': 'Employee created task'
        })

        const newTask = {
          task: req.body.task
        }

        emp.tasks.push(newTask);
        emp.save();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
})

// updateTask (from kerrey-composer-routes.js)
router.put("/:empId/tasks", async(req, res) => {
  try {
    Employee.findOne({ "empId": req.params.empId }, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Server Error: ' + err.message
        })
      } else {
        if (emp) {
          emp.set({
            todo: req.body.todo,
            doing: req.body.doing,
            done: req.body.done
          })
          emp.save(function(err, updatedTask) {
            if(err) {
              console.log(err);
              req.status(501).send({
                'err': 'MongoDB Server Error: ' + err.message
              })
            } else {
              console.log(updatedTask);
              res.status(200).json(emp)
            }
          })
        } else {
          if (!emp) {
            res.status(401).send({
              "message": "Invalid employeeId"
            })
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
});

// deleteTask
router.delete("/:empId/tasks/:taskId", async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Server Error: ' + err.message
        })
      } else {
        Employee.findByIdAndDelete({ "taskId": req.params.taskId }, function(err, emp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              "message": `MongoDB Exception ${err}`
            })
          } else {
            console.log(emp);
            res.status(200).json(emp)
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
});


module.exports = router;
