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
const BaseResponse = require("../models/base-response");
const Employee = require("../models/employee");
const BaseResponse = require('../models/base-response');

const router = express.Router();

// findAllTasks (from kerrey-node-shopper.routes.js)
router.get('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo doing done', function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Exception: ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
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
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Exception' + err.message
        })
      } else {
        console.log(emp);

        const newTask = {
          text: req.body.text
        }

        emp.todo.push(newTask);

        emp.save(function (err, updatedEmp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              'err': 'MongoDB server error: ' + err.message
            })
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp)
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
})

// updateTasks
// in class

router.put('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        const updateTasksMongoDbError = new BaseError('501', 'MongoDB server error', err);
        console.log(updateTasksMongoDbError.toObject());
        res.status(501).send(updateTasksMongoDbError.toObject());
      } else {
        console.log(emp);

        emp.set({
          todo: req.body.todo,
          done: req.body.done
        })

        emp.save(function(err, updatedEmp) {
          if (err) {
            const updatedEmpMongoError = new BaseResponse('501', 'MongoDB server error', err);
            console.log(updatedEmpMongoError.toObject());
            res.status(501).send(updatedEmpMongoError.toObject());
          } else {
            const updatedEmpResponse = new BaseResponse('200', 'Query successful', updatedEmp);
            console.log(updatedEmpResponse.toObject());
            res.status(200).send(updatedEmpResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    const updateTasksCatchError = new BaseResponse('500', 'Internal server error', e);
    console.log(updateTasksCatchError.toObject());
    res.status(500).send(updateTasksCatchError.toObject());
  }
})


// not in class
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
// in class

router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB server error', err);
        console.log(deleteTaskMongoErrorResponse.toObject());
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(emp);

        const taskId = req.params.taskId;

        const todoItem = emp.todo.find(item => item._id.toString() === taskId);
        const doneItem = emp.done.find(item => item._id.toString() === taskId);

        if (todoItem) {
          emp.todo.id(todoItem._id).remove();

          emp.save(function(err, updateTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseREsponse('200', 'Query Successful', updatedTodoItemEmp);
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          })

        } else if (doneItem) {
          emp.done.id(doneItem._id).remove();

          emp.save(function(err, updatedDoneItemEmp) {
            if (err) {
              const updatedDoneItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccessResponse = new BaseResponse('200', 'Query successful', updatedDoneItemEmp);
              console.log(updatedDoneItemSuccessResponse.toObject());
              res.status(200).send(updatedDoneItemSuccessResponse.toObject());
            }
          })
        } else {
          const invalidTaskIdResponse = new BaseResponse('300', 'Invalid taskId. ' + taskId)
          console.log(invalidTaskIdResponse.toObject());
          res.status(300).send(invalidTaskIdResponse.toObject());
        }

      }
    })
  } catch (e) {
    const deleteTaskErrorResponse = new BaseResponse('500', ' Internal server error', e);
    console.log(deleteTaskErrorResponse.toObject());
    res.status(500).send(deleteTaskErrorResponse.toObject());
  }
})

// not in class
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
