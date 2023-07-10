import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Ecommerce en Node JS',
        description:
          'Api desarrollada en Node JS, express y mongo, para crear backend para ecommerce, como parte de mi proyecto final luego de cursar en Coderhouse',
        version: '1.0.0',
      },
    },
    apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)

export const docsRouter = Router()

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))

