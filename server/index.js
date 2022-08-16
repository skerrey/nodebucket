/**
============================================
; Title: nodebucket
; Author: Professor Krasso
; Date: 21 August 2022
; Modified By: Seth Kerrey
; Description: nodebucket index.js
; Code Attribution: Additional code from buwebdev
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require('mongoose');
const employeeAPI = require('./routes/employee-routes');
const taskAPI = require('./routes/task-routes');

const app = express(); // Express variable.

// API
app.use('/api/employees', employeeAPI); // shortened URI
app.use('/api/employees', taskAPI);


// Swagger
const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Nodebucket',
          version: '1.0.0',
      },
  },
  apis: ['./server/routes/*.js'], // files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);


/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// default server port value.
const PORT = 3000 || process.env.PORT;

// This line will be replaced with your database connection string (including username/password).
const CONN = 'mongodb+srv://nodebucket_user:s3cret@buwebdev-cluster-1.ixkw5.mongodb.net/nodebucket?retryWrites=true&w=majority';


/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
