import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Ecommerce en Node JS',
        description:
          `Api desarrollada en Node JS, express y mongo, para crear backend para ecommerce, como parte de mi proyecto final luego de cursar en Coderhouse. 
            Esta aplicacion esta enfocada al backend, por lo que todo el front end es renderizado desde el servidor, mediante Handlebars y solo con fines de mostrar de manera mas grafica la informacion.

            Funcionalidades principales:
              > Usuarios:
                - Sessiones manejadas por Signed Cookies, no almacenando informacion en servidor y con expiracion.
                - Inicio de session por terceros, utilizando servicio de GitHub.
                - Soporte para roles de "admin", "premium" y "user":
                  - Con distintos niveles de acceso y permisos segun requerimientos.
                  - Con posibilidad de que "admin" cambie rol de usuarios
                - Almacenamiento de images de usuarios, documentos y productos
                - Recuperacion de password mediante email y link de reestablecimiento expirable.
              > Ecommerce:
                - Productos
                  - Solo "admin" o "premium" pueden crear productos.
                  - Funcionalidad CRUD completa para los productos. 
                  - Usuarios "premium" pueden modificar solo sus propios productos
                  - "admin" solo puede eliminar productos, en cuyo caso se envia email automatico a dueño del producto
                  - Los productos son listados ordenados por stock y por "owner"
                - Carrito:
                  - Cada usuario puede agregar productos, modificar cantidades y eliminarlos del carrito
                  - Permite vaciar el carrito o pasar a proceso de compra
                  - Proceso de compra:
                    - Genera un ticket con fecha, listado de productos acceptados, listado de productos rechazados, y datos de la compra como precio, comprador, numero de ticket, etcs.
                    - Aquellos productos que fueron rechazados, seran mantenidos en el carrito del usuario para una futura compra.
                    
            Algunas consideraciones:
              - Paths accesibles sin autenticacion:
                - "/" : home, para mostrar posibles acciones a realizar
                - "/web/users/login" : Formulario de login
                - "/web/users/register" : Formulario para registro nuevos usuarios
              - El resto de paths, llevaran a login o denegaran acceso, dependiendo de si se esta accediendo a endpoints de API o si se realiza mediante el navegador como cliente web.            
          `,
        version: '1.0.0',
      },
    },
    apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)

export const docsRouter = Router()

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))

