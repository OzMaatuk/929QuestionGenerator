const swaggerJSDoc = require('swagger-jsdoc');

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
    apis: ['../api/routes*.js']
};

module.exports = {
    swagger: () => {return swaggerJSDoc(swaggerOptions)}
}