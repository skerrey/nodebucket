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
const mongoose = require('mongoose');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const employeeAPI = require('./routes/employee-api');

const app = express(); // Express variable.

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

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// API
app.use('/api/employees', employeeAPI); // shortened URI

// default server port value.
const PORT = 3000 || process.env.PORT;

// Database Connection
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


express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
