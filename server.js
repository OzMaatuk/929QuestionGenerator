'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./api/routes/qGenRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger definition.
 */
const swaggerDefinition = {
    info: {
        title: 'Bible_Question_Generator API description',
        version: '1.0.0',
        description: 'Bible_Question_Generator RESTful API description with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/api'
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/routes/qGenRoutes.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger API documentation
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

app.listen(3000, () => {
    console.log('929 Question Generator RESTful API server started on: ' + port);
  });