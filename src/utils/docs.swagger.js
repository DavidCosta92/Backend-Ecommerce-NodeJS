// const swaggerJsdoc = require('swagger-jsdoc');
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      description:
        'A simple CRUD API application made with Express and documented with Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./docs/**/*.yaml'],
}

export const specsSwagger = swaggerJSDoc(options)