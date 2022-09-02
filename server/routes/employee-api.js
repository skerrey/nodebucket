/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket employee API
; Code Attribution: Additional code from buwebdev
;===========================================
*/

// Require statements
const express = require("express");
const Employee = require("../models/employee");
const BaseResponse = require("../models/base-response");

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

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description: API for returning an employee's array of tasks from MongoDB Atlas.
 *     summary: Returns an array of tasks
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The user's empId.
 *         schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: Employee tasks
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// findAllTasks
router.get('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo doing done', function(err, emp) {
      if (err) {
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch (e) {
    console.log(e);
    const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
    res.status(500).send(errorResponse.toObject());
  }
})

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     description: API to create task by empId.
 *     summary: Create task by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The employee's ID
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *              text:
 *                description: User task input
 *                type: string
 *     responses:
 *       '200':
 *         description: Task added to empId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// createTask (from kerrey-node-shopper-routes.js)
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function(err, emp) {
      if (err) {
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
      } else {
        console.log(emp);

        const newTask = {
          text: req.body.text
        }

        emp.todo.push(newTask);

        emp.save(function (err, updatedEmp) {
          if (err) {
            const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
            console.log(mongoResponse.toObject());
            res.status(501).send(mongoResponse.toObject());
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
    res.status(500).send(errorResponse.toObject());
  }
})

// updateTasks
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
          doing: req.body.doing,
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

// deleteTask
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
        const doingItem = emp.doing.find(item => item._id.toString() === taskId);
        const doneItem = emp.done.find(item => item._id.toString() === taskId);

        if (todoItem) {
          emp.todo.id(todoItem._id).remove();

          emp.save(function(err, updatedTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse('200', 'Query Successful', updatedTodoItemEmp);
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          })

        } else if (doingItem) {
          emp.doing.id(doingItem._id).remove();

          emp.save(function(err, updatedDoingItemEmp) {
            if (err) {
              const updatedDoingItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedDoingItemErrResponse.toObject());
              res.status(501).send(updatedDoingItemErrResponse.toObject());
            } else {
              const updatedDoingItemSuccessResponse = new BaseResponse('200', 'Query successful', updatedDoingItemEmp);
              console.log(updatedDoingItemSuccessResponse.toObject());
              res.status(200).send(updatedDoingItemSuccessResponse.toObject());
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

module.exports = router;
